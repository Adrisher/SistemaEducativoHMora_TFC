import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { Curso } from '../curso/Curso';
import { Estudiante } from '../estudiante/Estudiante';
import { Representante } from '../estudiante/Representante';
import { Matricula } from './Matricula';
import Swal from 'sweetalert2';
import { CursoService } from 'src/app/services/curso.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { RepresentanteService } from 'src/app/services/representante.service';
import { MatriculaService } from 'src/app/services/matricula.service';
import { Periodo } from '../periodo/periodo';
import { PeriodoService } from 'src/app/services/periodo.service';
import { Usuario } from 'src/app/pages/estudiante/Usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent {

  cursos: Curso[] = [];
  curso: Curso = new Curso;
  ciclo: string;
  paralelo: string;
  paralelos: string[];

  estudiante: Estudiante = new Estudiante;
  matricula: Matricula = new Matricula;
  representante: Representante = new Representante;
  usuario: Usuario = new Usuario;

  periodos: Periodo[] = [];
  periodo: Periodo = new Periodo;







  constructor(private _CargarScripts: CargarScriptsService, private router: Router,
    private estudianteService: EstudianteService, private representanteService: RepresentanteService,
    private cursoService: CursoService, private matriculaService: MatriculaService, private periodoService: PeriodoService,
    private userService: AuthService) {
    _CargarScripts.funciones(["matricula"]);
  }

  ngOnInit(): void {
    this.cargarPeriodos();
  }



  // registrarMatricula() {
  //   this.representanteService.createRepresentante(this.representante).subscribe(
  //     data => {
  //       if (!data) {
  //       } else {
  //         this.representante.id_representante = data.id_representante;
  //         console.log(data);
  //         this.usuario.nombreUsuario = this.estudiante.cedula;
  //         this.usuario.contraseña = this.estudiante.cedula;
  //         this.userService.createUser(this.usuario).subscribe(
  //           response => {
  //             console.log(response);
  //             this.usuario.id_usuario = response.id_usuario;
  //             if (!response) {
  //             } else {
  //               this.estudiante.representante.id_representante = this.representante.id_representante;
  //               this.estudiante.usuario.id_usuario = this.usuario.id_usuario;
  //               this.estudianteService.createEstudiante(this.estudiante).subscribe(
  //                 result => {
  //                   console.log(result);
  //                   this.matricula.curso.id_curso = this.curso.id_curso;
  //                   this.matricula.periodo.id_periodo = this.periodo.id_periodo;
  //                   this.matricula.estudiante.id_estudiante = this.estudiante.id_estudiante;
  //                   this.matriculaService.create(this.matricula).subscribe(
  //                     mat => {
  //                       console.log(mat);
  //                       this.limpiarCampos()
  //                     }
  //                   )
  //                 }
  //               )
  //             }
  //           }
  //         )
  //       }
  //     }
  //   )
  // }
  registrarMatricula() {
    this.representanteService.createRepresentante(this.representante).subscribe(data => {
      if (data) {
        this.representante.id_representante = data.id_representante;
        console.log(data);
        this.usuario.nombreUsuario = this.estudiante.cedula;
        this.usuario.contraseña = this.estudiante.cedula;
        this.userService.createUser(this.usuario).subscribe(userResponse => {
          console.log(userResponse);
          if (userResponse) {
            this.estudiante.representante = this.representante;
            this.estudiante.usuario = userResponse;
            this.estudianteService.createEstudiante(this.estudiante).subscribe(estudianteResponse => {
              console.log(estudianteResponse);
              if (estudianteResponse) {
                this.matricula.curso.id_curso = this.curso.id_curso;
                this.matricula.periodo.id_periodo = this.periodo.id_periodo;
                this.matricula.estudiante.id_estudiante = estudianteResponse.id_estudiante;
                this.matriculaService.create(this.matricula).subscribe(matriculaResponse => {
                  console.log(matriculaResponse);
                  this.limpiarCampos();
                });
              }
            });
          }
        });
      }
    });
  }


  //   registrarUserEstudentRepre() {
  //     this.representanteService.createRepresentante(this.representante).subscribe(
  //       dataRepre => {
  //         console.log(dataRepre);
  //         this.representante = dataRepre;
  //       }
  //       this.usuario.nombreUsuario = this.estudiante.cedula;
  //                 this.usuario.contraseña = this.estudiante.cedula;
  //       this.userService.createUser

  //     )


  //   }
  // }


  cargarParalelos() {
    this.cursoService.buscarByCurso(this.ciclo).subscribe(
      cursos => this.cursos = cursos
    );
  }


  cargarPeriodos() {
    this.periodoService.getPeriodos().subscribe(
      periodos => this.periodos = periodos
    );
  }




  reloadPage() {
    window.location.reload();
  }


  limpiarCampos() {
    console.log("Entro a limpiar")
    this.representante.cedula = '';
    this.representante.nombre = '';
    this.representante.segundo_nombre = '';
    this.representante.primer_apellido = '';
    this.representante.segundo_apellido = '';
    this.representante.fecha_nacimiento = new Date;
    this.representante.correo = '';
    this.representante.direccion = '';
    this.representante.ocupacion = '';
    this.representante.telefonoContacto = '';
    this.representante.telefonoContacto2 = '';
    this.estudiante.cedula = '';
    this.estudiante.nombre = '';
    this.estudiante.segundo_nombre = '';
    this.estudiante.primer_apellido = '';
    this.estudiante.segundo_apellido = '';
    this.estudiante.fecha_nacimiento = new Date;
    this.estudiante.correo = '';
    this.estudiante.direccion = ''
  }
}
