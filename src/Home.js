
import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
    return (
      <div className="home">
        <div className="home__container">
          <img
            src="https://www.x-cart.com/wp-content/uploads/2019/01/ecommerce-768x278.jpg"
            alt=""
            className="home__image"
          />

          <div className="home__row">
            <Product
              id="12321341"
              title="Bennett Mystic 15.6 inch Laptop Shoulder Messenger Sling Office Bag, Water Repellent Fabric for Men and Women (Blue)"
              price={11.96}
              rating={5}
              image="https://images-na.ssl-images-amazon.com/images/I/71mEsHyzSCL._SL1000_.jpg"
            />
            <Product
              id="49538094"
              title="IFB 30 L Convection Microwave Oven (30BRC2, Black, With Starter Kit)"
              price={239.0}
              rating={4}
              image="https://images-na.ssl-images-amazon.com/images/I/81D8pNFmWzL._SL1500_.jpg"
            />
          </div>

          <div className="home__row">
            <Product
              id="4903850"
              title="TV"
              price={199.99}
              rating={3}
              image="https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_3000,f_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/326ac5f6-6cea-11ea-b76b-e2581aee4843.jpg"
            />
            <Product
              id="23445930"
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
              price={98.99}
              rating={5}
              image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            />
            <Product
              id="3254354345"
              title="Washing machine - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="https://storage.beko.co.uk/blomberg2018products/large/2Blomberg_WashingMachine_LWF28442G_Manhattan_FrontClosed.jpg"
            />
          </div>

          <div className="home__row">
            <Product
              id="90829332"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
              price={1094.98}
              rating={4}
              image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            />
          </div>
        </div>
      </div>
    );
}

export default Home;