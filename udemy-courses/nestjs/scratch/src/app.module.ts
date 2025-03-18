import { Module } from "@nestjs/common";
import { AppController, AppController2 } from "./app.controller";

@Module({ controllers: [AppController, AppController2] })
export class AppModule {}
