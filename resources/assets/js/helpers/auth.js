 

export function login(credential){
    return new Promise((res ,rej)=>{
        axios.post('/api/auth/login',credential).
        then((response)=>{res(response.data);
        }).catch((err)=>{
            rej('wrong email or password')
        })
    })
}


export function getLocalUser(){
    const userStr=localStorage.getItem('user');
    if(!userStr){
        return null;
    }

    return JSON.parse(userStr);
}
