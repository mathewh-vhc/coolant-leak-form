import { SENDrequestapi } from "../../../vapicore";

export function RequestAPI(props) {
    return new Promise((resolve,reject)=>{
        SENDrequestapi({
            collect:props.pack.collect,
            store:props.pack.store,
            db:props.pack.db,
            method:'query',
            options:{query:props.query||{}}
        },'STORE',{request:'mart'}).then(
            answr => {
            console.log(answr);
                if(answr.success){
                    let list = answr.body.result;
                    return resolve(list)
                } else {
                    return resolve(false)
                }
            }
        );
    });
}