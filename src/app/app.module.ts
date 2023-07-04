import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { GraphQLModule } from './graphql.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListParcsComponent } from './list-parcs/list-parcs.component';

@NgModule({
  declarations: [AppComponent, ListParcsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
