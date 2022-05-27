// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Login } from "App/Controllers/Service/Facebook/src/lib/Login";


export default class FanPagesController {
    public async post(){
        await Login({userName:'binhtrong.tran.8',password:'564752trongA?'});
        return 'ok';
    }
}
