# ToggleJS
A customizable  toggle switch all written in JS

Demo: [https://jsfiddle.net/qy0fu5ex/](https://jsfiddle.net/qy0fu5ex/1/)

1. Create a container in HTML
```html
<div id="toggleSwitch"></div>
...
<script src="https://cdn.jsdelivr.net/gh/XHiddenProjects/ToggleJS@0.0.4/toggle.min.js"></script>
<script src="../path/to/your/mian.js"></script>
```

2. Initate the class
```js
const options = {}; //Leaving it empty just uses the default
const toggle = new ToggleJS('#toggleSwitch', options);
```
3. Setting Options
```js
`const options = {
  states: [0,1], //Default as Off/On switch
  statesLabel: null, //Defualt null; Use string[] for each label
  current: 0, //Default 0; set the current state
  disabled: false, //Dfault false, Disable the toggle switch
  onToggle: null, //Default null, Runs a function on toggle change
  onInit: null, //Default null, Runs a function on toggle switch load
  styles: {
    track: {
       default:{
          width: '60px',
          height: '30px',
          backgroundColor: '#ccc',
          borderRadius: '15px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        },
        // Style for state 0 (e.g., Off)
        0: {
          width: '60px',
          height: '30px',
          backgroundColor: '#ccc',
          borderRadius: '15px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        },
        // Style for state 1 (e.g., On)
        1: {
          width: '60px',
          height: '30px',
          backgroundColor: '#4CAF50', // Green color
          borderRadius: '15px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }
      },
      thumb: {
        default:{
          width: '28px',
          height: '28px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          position: 'absolute',
          top: '1px',
          left: '1px',
          transition: 'left 0.3s'
        },
        // Style for state 0
        0: {
          width: '28px',
          height: '28px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          position: 'absolute',
          top: '1px',
          left: '1px',
          transition: 'left 0.3s'
        },
        // Style for state 1
        1: {
          width: '28px',
          height: '28px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          position: 'absolute',
          top: '1px',
          left: '31px', // move to the right side
          transition: 'left 0.3s'
        }
      }
    }
};
```
5. Stylesheet
Styles in the **styles** object must be a _cAmEl_ format: ie. `backgroundColor, opacity, fontSize`

```js
styles:{
  //Style the track
  track:{
    //Track state
    0:{
      // Stylesheet
    }
  },
  //Style the thumb
  thumb:{
    //Thumb state
    0:{
      // Stylesheet
    }
  }
}
```

6. `onToggle()` and `onInit()`
Use these to get the results of the toggle switch
```json
{
  "value": "(Int) toggleSwitchStatus",
  "label": "(String|Int) toggleSwitchLabel",
  "disabled": "(Boolean) toggleSwitchDisabledStatus"
}
```

7. Extra methods
Here is extra methods that can be used
```js
console.log(toggle.getValue()); //Returns the value of the toggle
toggle.setState(Number); //Sets the state of the toggle switch
toggle.setDisabled(Boolean); //Set the toggle switch to be disabled  
```
