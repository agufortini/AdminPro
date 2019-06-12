import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.returnObservable()
    .subscribe(
      num => console.log('Subs ', num),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let cont = 0;

      const intervalo = setInterval(() => {

        cont ++;

        const salida = {
          valor: cont
        };

        observer.next(salida);

        // if (cont === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (cont === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }

      }, 1000);

    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        // console.log('Filter', valor, index);

        if ((valor % 2) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );


  }

}
