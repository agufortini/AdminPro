import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  stPageTitle: string;

  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {

    this.getDataRoute()
    .subscribe(data => {
      console.log(event);
      this.stPageTitle = data.titulo;
      this.title.setTitle(this.stPageTitle);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.stPageTitle
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute() {

    return this.router.events.pipe(

      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)

    );

  }

}
