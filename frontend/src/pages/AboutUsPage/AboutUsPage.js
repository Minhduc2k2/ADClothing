import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import axios from "./../../hooks/axios";
import "./AboutUsPage.css";

function AboutUsPage() {


    return (
        <div className="container1">
            <div className="card">
                <img className="dev-avatar" src="assets/images/avatar-nva-20110434.jpg" alt="John" />
                <h1>Nguyen Van An</h1>
                <h2 className="code">20110434</h2>
                <p className="desc">HCMC University of Technology and Education</p>
                <p><a href="https://www.facebook.com/ON.611.02"><button className="btn-contact" >Contact</button></a></p>
            </div>
            <div className="card">
                <img className="dev-avatar" src="assets/images/avatar-nmd-20110461.jpg" alt="John" />
                <h1>Nguyen Minh Duc</h1>
                <h2 className="code">20110461</h2>
                <p className="desc">HCMC University of Technology and Education</p>
                <p><a href="https://www.facebook.com/mingduc2k2"><button className="btn-contact" >Contact</button></a></p>
            </div>


        </div>
    );
}

export default AboutUsPage;
