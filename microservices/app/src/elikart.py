import json
import os
import sys
import requests
from ast import literal_eval
from flask import Blueprint, jsonify
from flask import  render_template, url_for, request, redirect, flash, make_response, abort,session
from logging import DEBUG
import datetime
from src import app
from flask_wtf import Form
from wtforms.fields import StringField, PasswordField, FileField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, email, EqualTo
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.utils import secure_filename

#CURRENT_FOLDER = os.path.expanduser('~')
UPLOAD_FOLDER = os.path.join(os.path.expanduser('~'),'static','uploads')
ALLOWED_EXTENSIONS = set(['jpg','jpeg','png'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#UPLOAD_FOLDER = 'C:\\Users\\Karthik\\hello-python-flask\\microservices\\app\\src\\static\\uploads'
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#os.path.dirname(os.path.abspath(__file__))




PRODUCTION_ENV = os.environ.get("PRODUCTION")
CLUSTER_NAME = os.environ.get("CLUSTER_NAME")
if CLUSTER_NAME is None:
    print("""
    Set the name of your cluster as an environment variable and start again:

    $ export CLUSTER_NAME=<cluster-name>

    """)

dataUrl = "https://data." + "banner20" + ".hasura-app.io/v1/query"

elikart = Blueprint('elikart', __name__)

app.config['SECRET_KEY'] = b'\xb7\xd8\xa0\x8b\x82\r\xa4W\xb00\x13s\x00\x1e\xd6hT\xc3F@3\xff<\x1e'
app.config['DEBUG'] = True

toolbar = DebugToolbarExtension(app)
@elikart.route('/getinfo')
def getinfo():
    if 'data' in js and 'auth_token' in js['data']:
        print('entered _flashes')

    # This is the url to which the query is made
        url = "https://auth.banner20.hasura-app.io/v1/user/info"

        # This is the json payload for the query
        # Setting headers
        headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' +str(js['data']['auth_token'])
        }

        # Make the query and store response in resp
        resp = requests.request("GET", url, headers=headers)

        # resp.content contains the json response.
        return resp.content
    else:
        return 'you are not logged in'

@elikart.route("/get_users")
def get_users():
    query = {
        "type": "select",
        "args": {
            "table": "user",
            "columns": [
                "*"
            ]
        }
    }
    print(dataUrl)
    print(json.dumps(query))
    response = requests.post(
        dataUrl, data=json.dumps(query)
    )
    data = response.json()
    print(json.dumps(data))
    return jsonify(data=data)

@elikart.route('/signup',methods=['GET','POST'])
def signup():
    content = request.get_json()
    js = json.loads(json.dumps(content))
    if js and 'data' in js and 'email' in js['data'] and 'password' in js['data']:
        first_name = js['data']['first_name']#form.first_name.data 
        last_name =  js['data']['last_name']#form.last_name.data
        email = js['data']['email'] #form.email.data 
        phone_number =  js['data']['phone_number']#form.phone_number.data
        password = js['data']['password']#form.password.data
        print(first_name,last_name,email,phone_number,password)
        app.logger.debug('Submitted Successfully :-)\nName: '+first_name +'\nEmail : '+ email)

        # This is the json payload for the query
        requestPayload = {
            "type": "select",
            "args": {
                "table": "user",
                "columns": [
                    "user_email_address"
                ],
                "where": {
                    "user_email_address": {
                        "$eq": email
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)


        # resp.content contains the json response.
        if resp.json():
            return jsonify({"error":"The Email is already taken as username"})
        else:
            authurl = "https://auth.banner20.hasura-app.io/v1/signup"

            # This is the json payload for the query
            requestPayload = {
                            "provider": "username",
                            "data": {
                                "username": email,
                                "password": password
                            }
                        }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", authurl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
            print('\n\n')
            print(resp.json())
            print('\n\n')
            hasura_user_id= resp.json()['hasura_id']
            print('\n\nhasura_id: '+str(hasura_user_id)+'\n')

            requestPayload = {
                                "type": "insert",
                                "args": {
                                    "table": "user",
                                    "objects": [{"user_first_name": first_name,
                                                "user_last_name": last_name,
                                                "user_email_address": email,
                                                "phone_number": phone_number,
                                                "password": password, "hasura_id": hasura_user_id}
                                    ]
                                }
                            }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)
            return resp.content
    else:
        return jsonify({'error':'please enter all the fields required'})

@elikart.route('/seller_signup',methods=['GET','POST'])
def seller_signup():
    content = request.get_json()
    js = json.loads(json.dumps(content))
    if js and 'data' in js and 'email' in js['data'] and 'password' in js['data']:
        first_name = js['data']['first_name']#form.first_name.data 
        last_name =  js['data']['last_name']#form.last_name.data
        email = js['data']['email'] #form.email.data 
        phone_number =  js['data']['phone_number']#form.phone_number.data
        password = js['data']['password']#form.password.data
        print(first_name,last_name,email,phone_number,password)
        app.logger.debug('Submitted Successfully :-)\nName: '+first_name +'\nEmail : '+ email)

        # This is the json payload for the query
        requestPayload = {
            "type": "select",
            "args": {
                "table": "seller",
                "columns": [
                    "email_address"
                ],
                "where": {
                    "email_address": {
                        "$eq": email
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)


        # resp.content contains the json response.
        if resp.json():
            return jsonify({"error":"The Email is already taken as username"})
        else:
            authurl = "https://auth.banner20.hasura-app.io/v1/signup"

            # This is the json payload for the query
            requestPayload = {
                            "provider": "username",
                            "data": {
                                "username": email,
                                "password": password
                            }
                        }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", authurl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
            print('\n\n')
            print(resp.json())
            print('\n\n')
            hasura_user_id= resp.json()['hasura_id']
            print('\n\nhasura_id: '+str(hasura_user_id)+'\n')

            requestPayload = {
                                "type": "insert",
                                "args": {
                                    "table": "seller",
                                    "objects": [{"first_name": first_name,
                                                "last_name": last_name,
                                                "email_address": email,
                                                "phone_number": phone_number,
                                                "password": password, "hasura_id": hasura_user_id}
                                    ]
                                }
                            }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
            return resp.content
    else:
        return jsonify({'error':'please enter all the fields required'})


@elikart.route('/seller_login',methods=['GET','POST'])
def seller_login():
    if js and 'data' in js and 'email' in js['data'] and 'password' in js['password']:

        print("\n\n\nprint \n entered form correctly\n \n")
        email = request.form['email'] #form.email.data #form.email.data
        password = request.form['password']#form.password.data
        app.logger.debug('Submitted Successfully :-)\n '+'\nEmail : '+ email)


        # This is the json payload for the query
        requestPayload = {
            "type": "select",
            "args": {
                "table": "seller",
                "columns": [
                    "first_name",
                    "last_name",
                    "email_address",
                    "password"
                ],
                "where": {
                    "$and": [
                        {
                            "email_address": {
                                "$eq": email
                            }
                        },
                        {
                            "password": {
                                "$eq": password
                            }
                        }
                    ]
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        print(resp.content)

         # resp.content contains the json response.
        if resp.json():
            return resp.content
        else:
            return jsonify({"error":"Invalid Email/Password"})
    else:
        return jsonify({'error':'please enter all the fields required'})
    

@elikart.route('/login',methods=['GET','POST'])
def login():
    #form = seller_loginForm()
    content = request.get_json()
    print(content)
    js = json.loads(json.dumps(content))
    print(js)

    if js and 'data' in js and 'email' in js['data'] and 'password' in js['data']:
        print("\n\n\nprint \n entered form correctly\n \n")
        email = js['data']['email']
        password = js['data']['password']
        app.logger.debug('Submitted Successfully :-)\n '+'\nEmail : '+ email)

        import requests
        # This is the url to which the query is made
        url = "https://auth.banner20.hasura-app.io/v1/login"

        # This is the json payload for the query
        requestPayload = {
            "provider": "username",
            "data": {
                "username": email,
                "password": password
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        respo = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)
        #response = make_response(render_template('index.html'))
        #string = resp.content.decode('utf-8')
        #json_obj = json.loads(string)
        #print(json_obj)
        #session_tokens = json_obj
        if b"auth_token"  in respo.content:
            user_info= {}
            session_tokens = respo.content.decode('utf8')
            print("\n\nrespo.content.decode('utf8')\n",session_tokens)
            session_tokens = literal_eval(session_tokens)
            print("\n\nsession_tokens\n",session_tokens)
            for i in session_tokens:
                user_info[i] = session_tokens[i]
            user_details = json.dumps(user_info)

            resp = make_response(user_details)
            for i in user_info:
                resp.set_cookie(i, str(user_info[i]))
        
        # resp.content contains the json response.
        #print(resp.content)
            return resp
        else:
            return jsonify({"error":"Invalid credentials"})
    else:
        return jsonify({'error':'please enter all the required fields '})
    


@elikart.route('/logout', methods=['GET','POST'])
def logout():
    auth_token=request.cookies.get('auth_token')
    if auth_token:

        # This is the url to which the query is made
        url = "https://auth.banner20.hasura-app.io/v1/user/logout"

        # This is the json payload for the query
        # Setting headers
        headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + auth_token

        }

        # Make the query and store response in resp
        resp = requests.request("POST", url, headers=headers)

        response = make_response(resp.content)
        response.set_cookie('auth_token','None')
        response.set_cookie('username','None')
        response.set_cookie('hasura_id','None')
        response.set_cookie('hasura_roles','None')


        # resp.content contains the json response.
        print(resp.content)
        return response
    else:
        return jsonify({'error':'no session information found'})


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS


def getPhoto_url(file):
    print('entered getPhoto_url function\n')
    if file and allowed_file(file.filename) and 'auth_token' in session:
        print('valid file extension\n')
        filename = secure_filename(file.filename)
        file.save(os.path.join(os.getcwd(),filename))
        image=filename
            # This is the url to which the query is made
        url = "https://filestore.banner20.hasura-app.io/v1/file"
        headers = {
                    "Content-Type": "image/png",
                    "Authorization": 'Bearer ' +str(session['auth_token']) #+str(session['auth_token'])
                    }
            # Open the file and make the query
        with open(filename, 'rb') as file_image:
            resp = requests.post(url, data=file_image.read(), headers=headers)

            # resp.content contains the json response.
        print(resp.content)
        return url + '/'+ str(resp.content.decode())
    return False


@elikart.route('/add_product',methods=['GET','POST'])
def add_product():
    content = request.get_json()
    js = json.loads(json.dumps(content))
    auth_token = request.args.get("auth_token")
    print('\n\n auth token: \n',auth_token)
    hasura_id = request.args.get('hasura_id')
    if js and 'data' in js:
        print(js['data'])
    if auth_token :
        #auth_token=js['data']['auth_token']
        #hasura_id= js['data']['hasura_id']
        print(hasura_id)
        print('entered first if\n',hasura_id)

        requestPayload = {
            "type": "select",
            "args": {
                "table": "seller",
                "columns": [
                    "id"
                ],
                "where": {
                    "hasura_id": {
                        "$eq": hasura_id
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)
        print('resp of select seller id query\n',resp )
        string = resp.content.decode('utf-8')
        json_obj = json.loads(string)
        print(json_obj)
        seller_id = json_obj[0]['id']
        #print("type(seller_id):\n",type(seller_id))
        print('seller id\n',seller_id )
        # resp.content contains the json response.
        print(resp.content)
        #if 'seller_id' in resp :
        print('enetered post\n')
        product_name = request.form['product_name']
        sub_category = request.form['category']
        print('category:\n',sub_category)
        price = request.form['price']
        description = request.form['description']
        print('description:\n',description)
        file = request.files['filename']
        #file = js['data']['file']['_parts'][0][1]['uri']
        #print(file)
        # This is the url to which the query is made
        # This is the json payload for the query
        
        #category_id = resp.json()
        #print('category_id :\n',category_id)
        #image_url = getPhoto_url(image)
        print(file)
        if file and allowed_file(file.filename): #and 'auth_token' in session:
            print('valid file extension\n')
            filename = secure_filename(file.filename)
            file.save(os.path.join(os.getcwd(),filename))
            file=filename
            #print(file)
                # This is the url to which the query is made
            url = "https://filestore.banner20.hasura-app.io/v1/file"
            headers = {
                        "Content-Type": "image/png",
                        "Authorization": 'Bearer ' + auth_token #+str(session['auth_token'])
                        }
                # Open the file and make the query
            with open(file, 'rb') as file_image:
                resp = requests.post(url, data=file_image.read(), headers=headers)

                # resp.content contains the json response.
            #print(resp.content)
            string = resp.content.decode('utf-8')
            json_obj = json.loads(string)
            print(json_obj)
            imageurl = json_obj['file_id']
            image_url = url+'/'+imageurl
            print(image_url)


            #return url + '/'+ str(resp.content.decode())
        return jsonify({'error':'The file type is not allowed'})

        # This is the json payload for the query
        

        # This is the url to which the query is made
        url = "https://data.banner20.hasura-app.io/v1/query"

        # This is the json payload for the query
        requestPayload = {
            "type": "insert",
            "args": {
                "table": "product",
                "objects": [
                    {
                        "sub_category_id": sub_category,
                        "seller_id": seller_id,
                        "price": price,
                        "name": product_name,
                        "description": description,
                        "first_image_url":image_url
                    }
                ],
                "returning": [
                    "id"
                ]
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer 9bca3d796e53cf35b76858063c27d4e69ddb8707d6d5c67c"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        print(resp.content)
        print('resp of insert product query\n',resp )
        string = resp.content.decode('utf-8')
        json_obj = json.loads(string)
        product_id = json_obj['returning'][0]['id']
        print('the product id is \n', product_id)

        #product_id = resp.json()
        #print('product_id: \n',product_id)
        #
        requestPayload = {
            "type": "insert",
            "args": {
                "table": "product_image",
                "objects": [{"url": image_url,
                            "product_id": product_id,
                            "seller_id": seller_id,
                            }]
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)
        print('resp of insert image query\n',resp )

        # resp.content contains the json response.
        print(resp.content)
        success_msg = 'Successfully added product\n'+'product_id: '+str(product_id)+'\nimage_url: '+image_url
        return jsonify({'error': success_msg})

        #else:
         #   return "you are not authorised to add"
    return jsonify({'error':'you are not authorised to add'})


# Display product info by product id
# url example : https://app.banner20.hasura-app.io/product_info?product_id=2
@elikart.route("/product_info")
def complete_product_info():
    product_id = request.args.get("product_id")
    requestPayload = {
        "type": "select",
        "args": {
            "table": "complete_product_info",
            "columns": [
                "*"
            ],
            "where": {
                "product_id": {
                    "$eq": product_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    product_information = resp.content.decode('utf-8')
    product_information = literal_eval(product_information)
    return jsonify(product_information)

# Display product info by product id
# url example : https://app.banner20.hasura-app.io/product_images?product_id=2
@elikart.route("/product_images")
def product_images():
    product_id = request.args.get("product_id")
    requestPayload = {
                "type": "select",
                "args": {
                    "table": "product_image",
                    "columns": [
                        "url"
                    ],
                    "where": {
                        "product_id": {
                            "$eq": product_id
                        }
                    }
                }
            }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    images = resp.content.decode('utf-8')
    images = literal_eval(images)
    #images = resp.content
   
    return jsonify(images)
# Display product info by product id
# url example : https://app.banner20.hasura-app.io/product?product_id=2
@elikart.route("/product")
def product_info():
    product_id = request.args.get("product_id")
    requestPayload = {
        "type": "select",
        "args": {
            "table": "complete_product_info",
            "columns": [
                "*"
            ],
            "where": {
                "product_id": {
                    "$eq": product_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    product_information = resp.content.decode('utf-8')
    product_information = literal_eval(product_information)
    

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "product_image",
            "columns": [
                "url"
            ],
            "where": {
                "product_id": {
                    "$eq": product_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    images = resp.content.decode('utf-8')
    images = literal_eval(images)
    #images = resp.content
    images_count = len(images)
    for i in range(images_count):
        image_name = 'product_image'+'_'+str(i)
        if not product_information[0]['product_image'] == images[i]['url']:
            product_information[0][image_name] = images[i]['url']



    return jsonify(product_information)

# Display products by sub category id
# url example : https://app.banner20.hasura-app.io/displaybysubcategory?sub_category_id=1
@elikart.route("/displaybysubcategory")
def displaybysubcategory():
    sub_category_id = request.args.get("sub_category_id")
    requestPayload = {
        "type": "select",
        "args": {
            "table": "complete_product_info",
            "columns": [
                "*"
            ],
            "where": {
                "sub_category_id": {
                    "$eq": sub_category_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)
    products_by_sub_category = resp.content.decode('utf-8')
    products_by_sub_category = literal_eval(products_by_sub_category)
    # resp.content contains the json response.
    return jsonify(products_by_sub_category)
        
# Display products by category id
# url example : https://app.banner20.hasura-app.io/displaybycategory?category_id=1
@elikart.route("/displaybycategory")
def displaybycategory():
    category_id = request.args.get("category_id")
    requestPayload = {
        "type": "select",
        "args": {
            "table": "complete_product_info",
            "columns": [
                "*"
            ],
            "where": {
                "category_id": {
                    "$eq": category_id
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)
    products_by_category = resp.content.decode('utf-8')
    products_by_category = literal_eval(products_by_category)
    # resp.content contains the json response.
    return jsonify(products_by_category)


@elikart.route('/')
def home():
    # This is the json payload for the query
    content = request.get_json()
    js = json.loads(json.dumps(content))
    requestPayload = {
        "type": "select",
        "args": {
            "table": "category_and_sub",
            "columns": [
                "*"
            ]
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json",
    }


    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    category_and_sub_category = resp.content.decode('utf-8')
    category_and_sub_category = literal_eval(category_and_sub_category)
    # This is the json payload for the query
    category_and_sub_category_list = []
    for i in category_and_sub_category:
        category_url = 'https://app.banner20.hasura-app.io/displaybycategory?category_id=' + str(i['category_id'])
        i['category_url'] = category_url
        sub_category_url = 'https://app.banner20.hasura-app.io/displaybysubcategory?sub_category_id='+str(i['sub_category_id'])
        i['sub_category_url'] = sub_category_url
        category_and_sub_category_list.append(i)
    requestPayload = {
        "type": "select",
        "args": {
            "table": "product",
            "columns": [
                "id",
                "name",
                "price",
                "first_image_url"
            ],
            "order_by": [
                {
                    "column": "id",
                    "order": "desc"
                }
            ]
        }
    }
    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print('the type of resp.contet is\n'+str(type(resp.content))+'\n')
    products_list = resp.content
    print('resp of product query\n',resp )
    string = resp.content.decode('utf-8')
    products_list = literal_eval(string)
    product_list = []
    for i in products_list:
        product_url = 'https://app.banner20.hasura-app.io/product?product_id='+str(i['id'])
        i['product_url'] = product_url
        product_list.append(i)
    if js and 'data' in js and 'auth_token' in js:
        hasura_id= js['data']['hasura_id']
        # This is the json payload for the query
        requestPayload = {
            "type": "select",
            "args": {
                "table": "user",
                "columns": [
                    "user_id",
                    "user_first_name"
                ],
                "where": {
                    "hasura_id": {
                        "$eq": hasura_id
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' +str(session['auth_token'])
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        string = resp.content.decode('utf-8')
        json_obj = json.loads(string)
        print(json_obj)
        if json_obj:
            user_id = json_obj[0]['user_id']
            user_first_name =[]
            user_first_name.append({'user first name' : json_obj[0]['user_first_name']})
            #username = resp.content.decode()
            requestPayload = {
                "type": "select",
                "args": {
                    "table": "customer_cart_count",
                    "columns": [
                        "cart_items_count"
                    ],
                    "where": {
                        "customer_id": {
                            "$eq": user_id
                        }
                    }
                }
            }

            # Setting headers
            headers = {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' +session['auth_token']
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)
            string = resp.content.decode('utf-8')
            json_obj = json.loads(string)
            if json_obj:
                print(json_obj)
                cart_count = []
                cart_count.append({'cart count' : json_obj[0]['cart_items_count']})
                #cart_count = resp.content.decode()
                return jsonify(category_and_sub_category_list,user_first_name,cart_count,product_list)
            else:
                return jsonify(category_and_sub_category_list,user_first_name,product_list)
    else:
        return jsonify(category_and_sub_category_list,product_list)
"""
@elikart.route('/account/profile')
def profile():
    if 'hasura_id' in session:

            requestPayload = {
            "type": "select",
            "args": {
                "table": "customer_profile",
                "columns": [
                    "*"
                ],
                "where": {
                    "hasura_id": {
                        "$eq": session['hasura_id']
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json",
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        print(resp.content)
    else:
        return "please login"
"""
"""
@elikart.route("/account/profile/edit")
def editProfile():
    if 'hasura_id' in session:
"""
@elikart.route('/getproducts')
def products():
    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "product",
            "columns": [
                "id",
                "name",
                "price",
                "first_image_url"
            ],
            "order_by": [
                {
                    "column": "id",
                    "order": "desc"
                }
            ]
        }
    }
    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print('the type of resp.contet is\n'+str(type(resp.content))+'\n')
    products_list = resp.content
    print('resp of product query\n',resp )
    string = resp.content.decode('utf-8')
    products_list = literal_eval(string)
    product_list = []
    for i in products_list:
        product_url = 'https://app.banner20.hasura-app.io/product?product_id='+str(i['id'])
        i['product_url'] = product_url
        product_list.append(i)
    return jsonify(product_list)


@elikart.route('/json_login', methods=['POST'])
def json_login():
    content = request.get_json()
    js = json.loads(json.dumps(content))

    # This is the url to which the query is made
    url = "https://auth.banner20.hasura-app.io/v1/login"

    # This is the json payload for the query
    requestPayload = {
        "provider": "username",
        "data": {
            "username": js['data']['username'],
            "password": js['data']['password']
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json",

    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    return resp.content


@elikart.route('/place_order')
def place_order():
    content = request.get_json()
    js = json.loads(json.dumps(content))
    if js and 'data' in js and 'auth_token' in js['data']:
        auth_token=js['data']['auth_token']
        hasura_id= js['data']['hasura_id']

        requestPayload = {
            "type": "select",
            "args": {
                "table": "user",
                "columns": [
                    "user_id"
                ],
                "where": {
                    "hasura_id": {
                        "$eq": hasura_id
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        string = resp.content.decode('utf-8')
        user_id = literal_eval(string)['id']
        

        # This is the json payload for the query
        requestPayload = {
            "type": "insert",
            "args": {
                "table": "order",
                "objects": [
                    {
                        "customer_id": customer_id,
                        "expected_delivery_date_time": expected_delivery_date_time,
                        "total_order_price": total_order_price,
                        "ordered_address_id": address_id
                    }
                ],
                "returning": [
                    "id"
                ]
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json",
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        string = resp.content.decode('utf-8')
        order_id = literal_eval(string)['id']

        content = request.get_json()
        js = json.loads(json.dumps(content))

        if 'cart' in js['data']:
            cart = js['data']['cart']
            for product in cart:
                requestPayload = {
                    "type": "insert",
                    "args": {
                        "table": "items",
                        "objects": [
                            {
                                "product_id": cart['product_id'],
                                "seller_id": cart['seller_id'],
                                "quantity": cart['quantity'],
                                "order_id": order_id,
                                "product_price": cart['product_price'],
                                "product_quantity_price": cart['product_price']*cart['quantity']
                            }
                        ]
                    }
                }

                # Setting headers
                headers = {
                    "Content-Type": "application/json"
                }

                # Make the query and store response in resp
                resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

                # resp.content contains the json response.
                print(resp)
        else:
            product = js['data'][0]
            quantity = js['data']['quantity']
            requestPayload = {
                "type": "insert",
                "args": {
                    "table": "items",
                    "objects": [
                        {
                            "product_id": product['id'],
                            "seller_id": product['seller_id'],
                            "quantity": quantity,
                            "order_id": order_id,
                            "product_price": product['price'],
                            "product_quantity_price": product['price']*quantity
                        }
                    ]
                }
            }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
        return jsonify({'order id': order_id})
    else:
        return jsonify({'error':'you are not loggedin'})
@elikart.route('/add_to_cart',methods=['GET','POST'])
def add_to_cart():
    content = request.get_json()
    js = json.loads(json.dumps(content))
    print("entered add to cart\n\n", js)
    if js and 'auth_token' in js['data']:
        auth_token=js['data']['auth_token']
        hasura_id= js['data']['hasura_id']
        product_id = js['data']['product_id']
        print("hasura_id",hasura_id)
        print("product_id",product_id)
        requestPayload = {
            "type": "insert",
            "args": {
                "table": "cart",
                "objects": [
                    {
                        "product_id": product_id,
                        "customer_id": hasura_id
                    }
                ]
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)
        return resp.content
    else:
        return jsonify({'error':'you are not loggedin'})


@elikart.route('/search',methods=['GET','POST'])
def search():
    content = request.get_json()
    print(content)
    js = json.loads(json.dumps(content))
    if js:
        print('\n\nthe js is\n\n',js)
        print('\n\nthe js[data] is\n\n',js['data'])
        print('\n\nthe js[data][search] is\n\n',js['data']['search'])
        search_keyword = '%'+ js['data']['search']+'%'
        # This is the json payload for the query
        requestPayload = {
            "type": "select",
            "args": {
                "table": "complete_product_info",
                "columns": [
                    "product_id"
                ],
                "where": {
                    "$or": [
                        {
                            "category_name": {
                                "$like": search_keyword
                            }
                        },
                        {
                            "sub_category_name": {
                                "$like": search_keyword
                            }
                        },
                        {
                            "product_name": {
                                "$like": search_keyword
                            }
                        },
                        {
                            "product_description": {
                                "$like": search_keyword
                            }
                        }
                    ]
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        string = resp.content.decode('utf-8')
        products_list = literal_eval(string)
        print(str(products_list))
        product_list = []
        for i in products_list:
            product_url = 'https://app.banner20.hasura-app.io/product?product_id='+str(i['product_id'])
            # This is the json payload for the query
            # This is the json payload for the query
            requestPayload = {
                "type": "select",
                "args": {
                    "table": "product",
                    "columns": [
                        "id",
                        "name",
                        "price",
                        "first_image_url"
                    ],
                    "where": {
                        "id": {
                            "$eq": i['product_id']
                        }
                    }
                }
            }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
            print(resp.content)
            s = resp.content.decode('utf-8')
            prod_list = literal_eval(s)[0]
            prod_list['product_url'] = product_url
            product_list.append(prod_list)
        return jsonify(product_list)
    else:
        return jsonify({'error':'enter a search keyword'})

@elikart.route('/viewCart',methods=['POST'])
def view_cart():
    content = request.get_json()
    js = json.loads(json.dumps(content))
    if js and 'data' in js and 'auth_token' in js['data'] and 'hasura_id' in js['data']:
        requestPayload = {
            "type": "select",
            "args": {
                "table": "cart",
                "columns": [
                    "*"
                ],
                "where": {
                    "customer_id": {
                        "$eq": js['data']['hasura_id']
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        
        return resp.content
    else:
        return jsonify({"error":"Please login to view cart"})

@elikart.route('/editCart',methods=['GET','POST','PUT'])
def edit_cart():
    content = request.get_json()
    js = json.loads(json.dumps(content))
    if js and 'data' in js and 'auth_token' in js['data'] and 'hasura_id' in js['data']:
        requestPayload = {
            "type": "select",
            "args": {
                "table": "user",
                "columns": [
                    "user_id"
                ],
                "where": {
                    "hasura_id": {
                        "$eq": js['data']['hasura_id']
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        s = resp.content.decode('utf-8')
        user_id = literal_eval(s)
        if user_id :
            user_id = user_id[0]['user_id']
        
        if user_id:
            requestPayload = {
                "type": "select",
                "args": {
                    "table": "cart",
                    "columns": [
                        "*"
                    ],
                    "where": {
                        "customer_id": {
                            "$eq": user_id
                        }
                    }
                }
            }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
            return resp.content

        if js['data']['id'] and not js['data']['quantity']:
            requestPayload = {
                "type": "update",
                "args": {
                    "table": "cart",
                    "where": {
                        "id": {
                            "$eq": js['data']['id']
                        }
                    },
                    "$set": {
                        "created_at": datetime.datetime.now(),
                        "quantity": js['data']['quantity'],
                    }
                }
            }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
            print(resp.content)
        elif js['data']['id'] and js['data']['quantity'] == 0:
            # This is the json payload for the query
            requestPayload = {
                "type": "delete",
                "args": {
                    "table": "cart",
                    "where": {
                        "id": {
                            "$eq": js['data']['id']
                        }
                    }
                }
            }

            # Setting headers
            headers = {
                "Content-Type": "application/json"
            }

            # Make the query and store response in resp
            resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

            # resp.content contains the json response.
            print(resp.content)


@elikart.route('/view_orders')
def view_orders():    
    content = request.get_json()
    js = json.loads(json.dumps(content))
    if js and 'data' in js and 'auth_token' in js['data'] and 'hasura_id' in js['data']:
        requestPayload = {
            "type": "select",
            "args": {
                "table": "user",
                "columns": [
                    "user_id"
                ],
                "where": {
                    "hasura_id": {
                        "$eq": js['data']['hasura_id']
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        s = resp.content.decode('utf-8')
        user_id = literal_eval(s)
        if user_id :
            user_id = user_id[0]['user_id']
    if user_id:
        requestPayload = {
            "type": "select",
            "args": {
                "table": "order",
                "columns": [
                    "*"
                ],
                "where": {
                    "customer_id": {
                        "$eq": user_id
                    }
                }
            }
        }

        # Setting headers
        headers = {
            "Content-Type": "application/json"
        }

        # Make the query and store response in resp
        resp = requests.request("POST", dataUrl, data=json.dumps(requestPayload), headers=headers)

        # resp.content contains the json response.
        return resp.content

@elikart.route('/offers')
def offers():
    url = "https://data.banner20.hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "offers",
            "columns": [
                "*"
            ]
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    string = resp.content.decode('utf-8')
    offers_list = literal_eval(string)
    return jsonify(offers_list)