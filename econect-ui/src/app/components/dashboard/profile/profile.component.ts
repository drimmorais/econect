import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DAYS, MATERIAL } from 'src/app/properties';
import { isConstructorDeclaration } from 'typescript';
import { AuthService } from '../../service/auth/auth.service';
import { UpdateService } from '../../service/update/update.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public editForm: FormGroup;
  public onEdit = false;
  public viewPermission = true;
  public name: string;
  private tag: any;
  public typeAux = []
  public materials = MATERIAL;
  public days = DAYS;
  public cnpj: string
  constructor(
    private updateService: UpdateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.tag = this.authService.getUserInfos();

    if (this.tag.tag === 'citizen') {
      this.viewPermission = false;
    }
    this.createForm();
    this.isDisable();
  }

  public createForm() {
    this.editForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      street: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      hours_of_operation: new FormControl(null, null),
      biography: new FormControl(null, Validators.required),
      initialHour: new FormControl(null, Validators.required),
      finalHour: new FormControl(null, Validators.required),
      social_reason: new FormControl(null, Validators.required),
      delivery_type: new FormControl(null, Validators.required),
      types_of_materials_accepted: new FormControl(null, Validators.required),
      days_of_operation: new FormControl(null, Validators.required),
      initial_date: new FormControl(null, null),
      final_date: new FormControl(null, null),

    })
  }

  private isDisable(): void {
    this.getUser();
    this.editForm.disable()
  }

  public edit(): void {
    this.onEdit = true
    this.editForm.enable()
    this.getUser();
  }

  public getUser() {
    let user: any
    if (this.tag.tag === 'collect point') {
      this.updateService.getUserCollectPoint()
        .subscribe((res) => {
          user = res
          console.log(user)
          this.typeAux = user.types_of_materials_accepted
          console.log('rees', user.types_of_materials_accepted)
          this.name = user.name
          this.editForm.get('name')?.setValue(user.name)
          this.editForm.get('username')?.setValue(user.username)
          this.editForm.get('email')?.setValue(user.email)
          this.editForm.get('phone')?.setValue(user.phone)
          this.editForm.get('street')?.setValue(user.street)
          this.editForm.get('zipcode')?.setValue(user.zipcode)
          this.editForm.get('uf')?.setValue(user.uf)
          this.editForm.get('city')?.setValue(user.city)
          this.editForm.get('district')?.setValue(user.district)
          this.editForm.get('number')?.setValue(user.number)
          this.editForm.get('hours_of_operation')?.setValue(user.hours_of_operation)
          this.editForm.get('biography')?.setValue(user.biography)
          let aux1 = user.hours_of_operation.slice(0, -8);
          let aux2 = user.hours_of_operation.slice(-5);
          this.editForm.get('initialHour')?.setValue(aux1)
          this.editForm.get('finalHour')?.setValue(aux2)
          this.editForm.get('social_reason')?.setValue(user.social_reason)
          this.editForm.get('delivery_type')?.setValue(user.delivery_type)
          this.editForm.get('types_of_materials_accepted')?.setValue(user.types_of_materials_accepted)
          let auxOp = user.days_of_operation.split(':')
          console.log(auxOp)
          this.editForm.get('initial_date')?.setValue(auxOp[0])
          this.editForm.get('final_date')?.setValue(auxOp[1])
          this.cnpj = user.cnpj

        }, (err: HttpErrorResponse) => {
          console.log('Erro no get', err.error)
        });
    } else if (this.tag.tag === 'citizen') {
      this.updateService.getUserCitizen()
        .subscribe((res) => {
          user = res
          console.log(res)
          this.name = user.name
          this.editForm.get('name')?.setValue(user.name)
          this.editForm.get('username')?.setValue(user.username)
          this.editForm.get('email')?.setValue(user.email)
          this.editForm.get('phone')?.setValue(user.phone)
          this.editForm.get('street')?.setValue(user.street)
          this.editForm.get('zipcode')?.setValue(user.zipcode)
          this.editForm.get('uf')?.setValue(user.uf)
          this.editForm.get('city')?.setValue(user.city)
          this.editForm.get('district')?.setValue(user.district)
          this.editForm.get('number')?.setValue(user.number)
          this.editForm.get('biography')?.setValue(user.biography)
          console.log(this.editForm.value)
        }, (err: HttpErrorResponse) => {
          console.log('Erro no get', err.error)
        });
    }
  }

  public saveEditCitizen(params: any): void {

    const user = {
      name: params.name,
      email: params.email,
      username: params.username
    }

    const citizen = {
      city: params.city,
      district: params.district,
      number: params.number,
      phone: params.phone,
      street: params.street,
      uf: params.uf,
      zipcode: params.zipcode,
      biography: params.biography,
    }

    forkJoin([this.updateService.updateUser(user), this.updateService.updateCitizen(citizen)])
      .subscribe((res) => {
        this.getUser();
        this.isDisable();
        this.onEdit = false;
      }, (err: HttpErrorResponse) => {
        console.log('Erro', err.error)
      });
  }

  public saveEditCollectPoint(params: any): void {

    const user = {
      name: params.name,
      email: params.email,
      username: params.username
    }
    console.log('ini:' + params.initialHour + 'final: ' + params.finalHour)
    const collectPoint = {
      city: params.city,
      cnpj: this.cnpj,
      district: params.district,
      number: params.number,
      phone: params.phone,
      street: params.street,
      uf: params.uf,
      zipcode: params.zipcode,
      biography: params.biography,
      hours_of_operation: `${params.initialHour} - ${params.finalHour}`,
      social_reason: params.social_reason,
      delivery_type: params.delivery_type,
      types_of_materials_accepted: params.types_of_materials_accepted,
      days_of_operation: `${params.initial_date} - ${params.final_date}`
    }

    console.log(collectPoint.hours_of_operation)

    forkJoin([this.updateService.updateUser(user), this.updateService.updateCollectPoint(collectPoint)])
      .subscribe((res) => {
        this.getUser();
        this.isDisable();
        this.onEdit = false;
      }, (err: HttpErrorResponse) => {
        console.log('Erro', err.error)
      });
  }
}
