import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return "hi there";
  }

  @Get('/route2')
  Route2() {
    return "hi route 2";
  }
}


@Controller('/con-level')
export class AppController2{
  @Get()
  getRoot() {
    return "hi there controller level route";
  }

  @Get('/route2')
  Route2() {
    return "hi route 2 controller level route";
  }
}