import {createStore} from 'redux';

const reducer=(state,action) => {
    if(action.type=='TEST'){
        return Object.assign({},state,{name:'SUCCESS'});
    }
    else if(action.type=='LOGIN'){
        return Object.assign({},state,{isLoggedIn:action.payload.isLoggedIn,auth_token:action.payload.auth_token});
    }
    else if(action.type=='ADDTOCART'){
        return Object.assign({},state,{cart:action.payload.cart});
    }
    else if(action.type=='REMOVEFROMCART'){
        return Object.assign({},state,{cart:action.payload.newarr});
    }
    else return state;
}

export default createStore(reducer,{
    name:'test',
    isLoggedIn:false,
    auth_token:'',
    cart:[
            {
                name:'orange',
                price:'199',
                image:'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/Add-icon.png'
            }
        ]
});

