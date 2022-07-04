import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { timeout } from 'rxjs/operators';
import { modalConfig } from 'src/app/config/modal.config';
import { post } from 'src/app/model/ecoblog/ecoblog.model';
import { AuthService } from '../../service/auth/auth.service';
import { EcoblogService } from '../../service/ecoblog/ecoblog.service';
import { SnackBar } from '../../service/snack-bar/snack-bar.service';

@Component({
  selector: 'app-eco-blog',
  templateUrl: './eco-blog.component.html',
  styleUrls: ['./eco-blog.component.scss']
})
export class EcoBlogComponent implements OnInit {

  public modalReference1: NgbModalRef;
  public createForm: FormGroup;
  public ecoPost: post[];
  public title: string;
  public author: string;
  public content: string;
  public permission: string;
  public tag: string

  constructor( private modalService: NgbModal, private ecoblog: EcoblogService, private snack: SnackBar, private authService: AuthService) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl('Adrielle Morais Coelho', Validators.required),
      contents: new FormControl(null, Validators.required),
      // contentPhoto: new FormControl('Opaaaaa', null)
    })


    let aux = this.authService.getUserInfos();
    this.tag = aux.tag;
    if (this.tag === 'collect point')
      this.permission = 'collect';
    else if (this.tag === 'citizen')
      this.permission = 'citizen';
    else
      this.permission = 'adm'

    this.getPostsEcoBlog()
  }

  public openModal(content: any, title?: string, author?: string, contentPost?: string): void {
    this.modalReference1 = this.modalService.open(content, { ...modalConfig, size: 'lg' });
    this.title = title || 'null';
    this.author = author || 'null';
    this.content = contentPost || 'null';
  }

  public newEcoBlog(params: any){
    console.log(params)
    this.ecoblog.create(params)
    .subscribe((res: any) => {
      console.log(res);
      this.getPostsEcoBlog();
      this.snack.openSuccess('Post criado com sucesso!!')
      this.modalReference1.close()
    }, err => this.snack.openError('O post não pode ser criado, tente novamente mais tarde!!'))
  }

  public getPostsEcoBlog(){
    this.ecoblog.getPosts()
    .subscribe((res: any) => {
      console.log(res)
      this.ecoPost = res;
    }, err => console.log(err))
  }

}
