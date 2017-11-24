import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.sass']
})
export class ContenidoComponent implements OnInit {
	count: number;
	cursosPagos: string[];
	cursos: string[];
	numCursos: any;
	constructor() {
	}

	cargarDatos(){
		var respuesta;
		fetch("https://api.cebroker.com/v2/featuredCoursesProfession?profession=36")
		.then(responsive => {
			responsive.text().then(data => {
				this.cursosPagos=JSON.parse(data);
				console.log(this.cursosPagos);
			});
		});
	}

	search(){
		console.log(":)");
		var txtSearch = (<HTMLInputElement>document.getElementById("txtSearch")).value;
		var respuesta, count, template, url, courses;
		var htmlResult="";
		url="https://api.cebroker.com/v2/search/courses/?expand=totalItems&pageIndex=1&pageSize=18&sortField=RELEVANCE&profession=36&courseType=CD_ANYTIME&sortShufflingSeed=27";
		if(typeof txtSearch!="undefined") url+="&courseName="+txtSearch;
		console.log(url);
		fetch(url)
		.then(responsive => {
			responsive.text().then(data => {
				this.cursos=JSON.parse(data).items;
				document.getElementById("numResultados").innerHTML = this.cursos.length.toString();
				/*
				for(count=0; count < courses.items.length; count++){
					var nodo=courses.items[count].course;
					var name_curso=nodo.name;
					if(name_curso.indexOf(txtSearch) != -1){
						debugger;
						template=`<li>
							<div class="info">
								<h3>${name_curso}</h3>
								<span>
									SMARTCE
								</span>
								<p>
									${nodo.deliveryMethod.description}
								</p>
								<button>
									$ 3.95
								</button>
							</div>
						</li>`;
						htmlResult=htmlResult+template;
					}
				}*/
				// document.getElementById("resultCourses").innerHTML=htmlResult;
			});
		});
	}

	ngOnInit() {
		this.cargarDatos();
		this.search();
	}
}
