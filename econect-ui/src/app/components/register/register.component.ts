import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/auth/user.model';
import { INewCitizen } from 'src/app/model/citizen/citizen.model';
import { RegisterService } from '../service/register/register.service';
import { DAYS, DELIVERY_TYPE, MATERIAL, STATES } from 'src/app/properties';
import { SnackBar } from '../service/snack-bar/snack-bar.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  public registerOneForm: FormGroup
  public registerCitizen: FormGroup
  public registerCollectPoint: FormGroup
  public isLinear = false;
  public hide = true;
  public canView = true;
  public colorOne = '#acbf60';
  public colorTwo = '#acbf60';
  private id: number;
  public matcher: any;
  public days = DAYS;
  public states = STATES;
  public materials = MATERIAL;
  public deliveryTypes = DELIVERY_TYPE;
  public cpfInvalid = false;
  public cnpjInvalid = false;
  public isInvalidPassword = false;
  constructor(
    private elementRef: ElementRef,
    private resgisterService: RegisterService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private snackBar: SnackBar
  ) { }

  ngOnInit(): void {
    this.createForms()
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e7ebea';
  }

  public createForms(): void {
    this.registerOneForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      typeuser: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))]),
      confirm_password: new FormControl(null, [Validators.required, Validators.pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))])
    })

    this.registerCitizen = new FormGroup({
      user_id_fk: new FormControl(0, Validators.required),
      cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      street: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      number: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      biography: new FormControl(null, null),
    })

    this.registerCollectPoint = new FormGroup({
      user_id_fk: new FormControl(0, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      street: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      number: new FormControl(null, Validators.required),
      uf: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      biography: new FormControl(null, null),
      cnpj: new FormControl(null, [Validators.required, Validators.minLength(14)]),
      start_hours: new FormControl(null, Validators.required),
      end_hours: new FormControl(null, Validators.required),
      hours_of_operation: new FormControl(null, null),
      operation_status: new FormControl(false, Validators.required),
      validation_status: new FormControl(false, Validators.required),
      social_reason: new FormControl(null, Validators.required),
      types_of_materials_accepted: new FormControl(null, Validators.required),
      delivery_type: new FormControl(null, Validators.required),
      days_of_operation: new FormControl(null, null),
      initial_day: new FormControl(null, Validators.required),
      finish_day: new FormControl(null, Validators.required),
    })
  }

  public saveUser(stepper: MatStepper, form: User,) {
    // this.canView = true
    this.resgisterService.postRegisterUser(form)
      .subscribe((res) => {
        console.log(res)
        this.id = res.id
        if (res.typeuser === 'citizen') {
          this.registerCitizen.get('user_id_fk')?.setValue(this.id);
          this.canView = true
        } else {
          this.registerCollectPoint.get('user_id_fk')?.setValue(this.id);
          this.canView = false
        }
        console.log(this.canView)
        stepper.next();
      }, (err: HttpErrorResponse) => {
        if(err.error.error === 'Passwor and confirm_password is not equality'){
          this.isInvalidPassword = true
          console.log('Erro -->', err.error.error)
        }
        this.snackBar.openError('Ops, ocorreu um erro. Tente novamente!')
        
      });
  }

  public saveCitizen() {
    const form = {
      user_id: this.registerCitizen.value.user_id_fk,
      phone: this.registerCitizen.value.phone,
      street: this.registerCitizen.value.street,
      zipcode: this.registerCitizen.value.zipcode,
      number: this.registerCitizen.value.number,
      uf: this.registerCitizen.value.uf.uf,
      city: this.registerCitizen.value.city,
      district: this.registerCitizen.value.district,
      biography: this.registerCitizen.value.biography,
      cpf: this.registerCitizen.value.cpf,
    }
    this.resgisterService.postRegisterCitizen(form)
      .subscribe((res: INewCitizen) => {
        console.log('Cheguei aqui no Subscribe', res)
        this.snackBar.openSuccess('Cadastro realizado com sucesso')
        this.router.navigate([atob(this.activatedRouter.snapshot.params.to || btoa('/login'))]);
      }, (err: HttpErrorResponse) => {
        console.log('erro -->', err)
        this.cpfInvalid = true
        this.snackBar.openError('Ops, cadastro não realizado. tente novamente!')
      });
  }

  public saveCollectPoint() {
    const form = {
      user_id_fk: this.registerCollectPoint.value.user_id_fk,
      phone: this.registerCollectPoint.value.phone,
      street: this.registerCollectPoint.value.street,
      zipcode: this.registerCollectPoint.value.zipcode,
      number: this.registerCollectPoint.value.number,
      uf: this.registerCollectPoint.value.uf.uf,
      city: this.registerCollectPoint.value.city,
      district: this.registerCollectPoint.value.district,
      biography: this.registerCollectPoint.value.biography,
      cnpj: this.registerCollectPoint.value.cnpj,
      hours_of_operation: `${this.registerCollectPoint.value.start_hours} - ${this.registerCollectPoint.value.end_hours}`,
      social_reason: this.registerCollectPoint.value.social_reason,
      types_of_materials_accepted: this.registerCollectPoint.value.types_of_materials_accepted.map((t: any) => t.value),
      delivery_type: this.registerCollectPoint.value.delivery_type.map((t: any) => t.value),
      days_of_operation: `${this.registerCollectPoint.value.initial_day.value}:${this.registerCollectPoint.value.finish_day.value}`,
    }
    console.log(form.delivery_type)
    this.resgisterService.postRegisterCollectPoint(form)
      .subscribe((res) => {
        console.log('Resposta => ', res)
        this.snackBar.openSuccess('Cadastro realizado com sucesso')
        this.router.navigate([atob(this.activatedRouter.snapshot.params.to || btoa('/login'))]);
      }, (err: HttpErrorResponse) => {
        if(err.error.error === 'Number of CNPJ is not valid'){
          console.log('netrei')
          this.cnpjInvalid = true;
        }
        this.snackBar.openError('Ops, cadastro não realizado. Tente novamente!')
        console.log('Deu ruim', err.error, err.error.error)
      });
  }

  public choiceCitizen(): void {
    if (this.colorTwo === '#acbf60') {
      this.colorTwo = '#326700';
      this.colorOne = '#acbf60';
      this.registerOneForm.get('typeuser')?.setValue('citizen')
    }
    else {
      this.colorTwo = '#acbf60';
      this.registerOneForm.get('typeuser')?.setValue('')
    }
    console.log(this.registerOneForm.value)
  }

  public choiceCollectPoint(): void {
    if (this.colorOne === '#acbf60') {
      this.colorOne = '#326700';
      this.colorTwo = '#acbf60';
      this.registerOneForm.get('typeuser')?.setValue('collect point')
    }
    else {
      this.colorOne = '#acbf60';
      this.registerOneForm.get('typeuser')?.setValue('')
    }
    console.log(this.registerOneForm.value)
  }

  getErrorMessage() {
    if (this.registerOneForm.value('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerOneForm.value('email').hasError('email') ? 'Not a valid email' : '';
  }


}

