import Particles, { ISourceOptions } from "react-tsparticles";
import Logo from './components/Logo/Logo.js';
import Navigation from './components/Navigation/Navigation.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import SignIn from "./components/SignIn/SignIn.js";
import Register from "./components/Register/Register.js";
import Clarifai from 'clarifai';
import React from 'react';
import './App.css';
import 'tachyons';

const APIKEY = '2f7e77d61d714a3ba211439feeab21c8'

window.process = {
  env: 'DEV',
}

// API Application-Program Interface

const app = new Clarifai.App({
  apiKey: APIKEY
})


const particleOptions1 = {
  // background: {
  //   color: "#0d47a1",
  // },
  interactivity: {
    events: {
      // onClick: {
      //   enable: true,
      //   mode: "push",
      // },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.5,
        size: 10,
      },
      repulse: {
        distance: 120,
        duration: 0.5,
      },
    },
  },
  particles: {
    // color: {
    //   value: "#ffffff",
    // },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 2,
    },
    collisions: {
      enable: true,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "bounce",
      bounce: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800,
      },
      value: 100,
    },
    opacity: {
      value: 0.7,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
      animation: {
        enable: true,
        speed: 4,
        minimumValue: 0.1,
        sync: false
      }
    },
  },
};



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width) ,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
    // console.log(event.target.value)
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
    .predict(
  // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
  // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
  // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
  // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
  // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
  // so you would change from:
  // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  // to:
  // .predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => 
        this.displayFaceBox(this.calculateFaceLocation(response))
        // console.log(response)
        )
      .catch(error => console.log(error))
  }

  onRouteChange = (route) => {
    this.setState({ route: route})
  }
  
  render() {
    return (
      <div className="App">
        <Particles className="particles" 
        options={particleOptions1}
        />
        
        {   this.state.route === 'home' ?
            <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition 
            box={this.state.box}
            imageUrl={this.state.imageUrl}
            />
            </div> 
            :
              this.state.route === 'signin' ?
              <SignIn onRouteChange={this.onRouteChange} /> : 
              <Register onRouteChange={this.onRouteChange} />
        }
        </div>
        );
      }
}

export default App;
