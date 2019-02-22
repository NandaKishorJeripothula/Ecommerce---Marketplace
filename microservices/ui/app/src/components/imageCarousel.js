import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';


class ImageCarousel extends Component{
  render(){
		return(
			<div>
			<div id="demo" className="carousel slide" data-ride="carousel">

  
  <ul className="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" className="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  
  
  <div className="carousel-inner">

    <div className="carousel-item  active">
      <img src='https://filestore.banner20.hasura-app.io/v1/file/b57de044-9382-45ff-acfa-b98499366fef' alt="Laptop Offers" minwidth="1688px"width="100%" height="288px" />
    </div>
    <div className="carousel-item" >
      <img src="https://filestore.banner20.hasura-app.io/v1/file/daf99caa-4322-443f-9e07-f281046912f8" alt="Samsung On Next" minwidth="1688px"width="100%" height="288px" />
    </div>
    <div className="carousel-item">
      <img src="https://filestore.banner20.hasura-app.io/v1/file/1fbaf473-29da-49ad-a532-0d4777453e4b" alt="Mobile Offers" minwidth="1688px"width="100%" height="288px"/>
    </div>
  </div>
  
  
  <a className="carousel-control-prev" href="#demo" data-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </a>
  <a className="carousel-control-next" href="#demo" data-slide="next">
    <span className="carousel-control-next-icon"></span>
  </a>
</div>
			</div>
			);

	}
}

export default ImageCarousel;