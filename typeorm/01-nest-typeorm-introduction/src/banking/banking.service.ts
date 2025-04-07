import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class BankingService {
constructor(private entityManager:EntityManager){}

async transferFunds(fromAccountId:string, toAccoutId:string, amount:number){
    return this.entityManager.transaction(async(manager)=>{
        const fromAccountId = await manager.findOne(Account, fromAccountId)
    })
}

}
