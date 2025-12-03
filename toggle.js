class ToggleJS {
    
    /**
     * Creates a toggle switch
     *
     * @constructor
     * @param {HTMLElement} el Element to insert the toggle switch
     * @param {{
     * states: Number[],
     * statesLabel: String[]|null,
     * disabled: Boolean,
     * current: Number,
     * styles:{
     *  track:Object,
     *  thumb: Object
     * },
     * onToggle: Function|null,
     * onInit: Function|null
     * }} options Toggle switch options
     * * options.states: Must be a number array, represent the number of states
     * * options.statesLabel: String array with the label of each state when toggled
     * * options.disabled: Disables the toggle switch
     * * options.styles: Object styles with the states of _track_ or _thumb_. 
     *  Use **default** key to set a default position when state isn't available.
     *  Use **Numerical values** to represent the state of the the toggle
     */
    constructor(el, options) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        if (!this.el) throw new Error("No element selected");
        this.el.style = "user-select: none;-ms-user-select: none;-moz-user-select: none;-ms-touch-select: none;-webkit-user-select: none;"
        const defaultTrackStyle = {
                        width: '60px',
                        height: '30px',
                        backgroundColor: '#ccc',
                        borderRadius: '15px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    },
            defaultThumbStyle = {
                        width: '28px',
                        height: '28px',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '1px',
                        left: '1px',
                        transition: 'left 0.3s'
            };
        this.options = Object.assign({
            states: [0, 1], // Default states
            statesLabel: null,
            disabled: false,
            current: 0,
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
            },
            onToggle: null,
            onInit: null
        }, options);
        
        if(!this.options.styles.track) this.options.styles.track = {};
        if(!this.options.styles.thumb) this.options.styles.thumb = {};

        
        for(let i=0;i<this.options.states.length;i++){
            if(!this.options.styles.track[i])
                this.options.styles.track[i] = defaultTrackStyle
            else{
                //Default necessities
                if(!this.options.styles.track[i].position) this.options.styles.track[i].position = 'relative';
                if(!this.options.styles.track[i].transition) this.options.styles.track[i].transition = 'background-color 0.3s';
                if(!this.options.styles.track[i].width) this.options.styles.track[i].width = '60px';
                if(!this.options.styles.track[i].height) this.options.styles.track[i].height = '30px';
                if(!this.options.styles.track[i].borderRadius) this.options.styles.track[i].borderRadius = '15px';
                if(!this.options.styles.track[i].cursor) this.options.styles.track[i].cursor = 'pointer';
            }
            if(!this.options.styles.thumb[i])
                this.options.styles.thumb[i] = defaultThumbStyle;
            else{
                //Default necessities
                if(!this.options.styles.thumb[i].position) this.options.styles.thumb[i].position = 'absolute';
                if(!this.options.styles.thumb[i].top) this.options.styles.thumb[i].top = '1px';
                if(!this.options.styles.thumb[i].left) this.options.styles.thumb[i].left = '0px';
                if(!this.options.styles.thumb[i].transition) this.options.styles.thumb[i].transition = 'left 0.3s';
                if(!this.options.styles.thumb[i].width) this.options.styles.thumb[i].width = '28px';
                if(!this.options.styles.thumb[i].height) this.options.styles.thumb[i].height = '28px';
                if(!this.options.styles.thumb[i].borderRadius) this.options.styles.thumb[i].borderRadius = '50%';
            }
        }
        
        this.stateIndex = this.options.current;
        this.isDisabled = this.options.disabled;
        this._init();
    }

    _fixStyle(styleObj) {
        const cssString = Object.entries(styleObj).map(([key, value]) => {
            const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            return `${kebabKey}:${value}`;
        }).join(';');
        return cssString;
    }
    //Returns the styles
    _getStyles(){
        return {
            trackStyles: (this.options.styles.track && this.options.styles.track[this.stateIndex]) || this.options.styles.track['default'] || {},
            thumbStyles: (this.options.styles.thumb && this.options.styles.thumb[this.stateIndex]) || this.options.styles.thumb['default'] || {}
        };
    }
    _applyStateStyles() {
        // Safely get style for current state, fallback to default if missing
        const trackStyles = this._getStyles().trackStyles;
        const thumbStyles = this._getStyles().thumbStyles;

        // Apply styles
        this.track.style.cssText = this._fixStyle(trackStyles);
        this.thumb.style.cssText = this._fixStyle(thumbStyles);
        const fontSizeVh = this._properFS(thumbStyles);
        // Set font size in vh units
        this.labelInside.style.fontSize = `${fontSizeVh}vh`;
        this._updateLabel();
    }
    _properFS(thumbStyles) {
        console.log(thumbStyles);
        const thumbWidth = parseFloat(thumbStyles.width);
        const initialVh = (thumbWidth / window.innerWidth) * 100 * 0.4; // initial estimate
        let fontSizeVh = initialVh;

        // Set initial font size
        this.labelInside.style.fontSize = `${fontSizeVh}vh`;

        const minFontSizeVh = 4; // prevent text from becoming too small

        const checkFit = () => {
            const textWidthPx = this.labelInside.offsetWidth;
            const thumbPx = thumbWidth;
            if (textWidthPx > thumbPx && fontSizeVh > minFontSizeVh) {
                // Reduce font size proportionally
                const newFontSizeVh = (thumbPx / textWidthPx) * fontSizeVh;
                this.labelInside.style.fontSize = `${newFontSizeVh}vh`;
                fontSizeVh = newFontSizeVh;
                setTimeout(checkFit, 0); // re-try
            }
            // If text fits or font is too small, stop
        };

        // Run after styles are applied
        setTimeout(checkFit, 0);
    }
    _init() {
        // Create track
        this.track = document.createElement('div');
        // Create thumb
        this.thumb = document.createElement('div');

        this.thumb.style.display = 'flex';
        this.thumb.style.alignItems = 'center';
        this.thumb.style.justifyContent = 'center';
        this.thumb.style.overflow = 'hidden';

        // Create label inside thumb
        this.labelInside = document.createElement('span');
        this.labelInside.style.position = 'absolute';
        this.labelInside.style.top = '50%';
        this.labelInside.style.left = '50%';
        this.labelInside.style.transform = 'translate(-50%, -50%)';

        this.labelInside.style.fontSize = `${this._properFS(this._getStyles().thumbStyles)}vh`;
        this.labelInside.style.pointerEvents = 'none';
        this.thumb.appendChild(this.labelInside);

        this.track.appendChild(this.thumb);
        this.el.appendChild(this.track);
        this._applyStateStyles();

        // Add external label if provided
        if (this.options.statesLabel) {
            this.label = document.createElement('span');
            this.label.style.marginLeft = '10px';
            this._updateLabel();
            this.el.appendChild(this.label);
        }

        // Set initial position
        this._updateUI();

        // Instead, add directional click handling:
        this.track.addEventListener('click', (e) => {
            if (this.isDisabled) return;
            const thumbRect = this.thumb.getBoundingClientRect();
            const clickX = e.clientX;

            if (clickX > thumbRect.right) {
                // Clicked on the right side - move to next state if not at last
                if (this.stateIndex < this.options.states.length - 1) {
                    this.setState(this.stateIndex + 1);
                    if (typeof this.options.onToggle === 'function') {
                        this.options.onToggle({
                            value: this.getValue(),
                            label: this.options.statesLabel ? this.options.statesLabel[this.stateIndex] : this.options.states[this.stateIndex],
                            disabled: this.options.disabled
                        });
                    }
                }
            } else if (clickX < thumbRect.left) {
                // Clicked on the left side - move to previous state if not at first
                if (this.stateIndex > 0) {
                    this.setState(this.stateIndex - 1);
                    if (typeof this.options.onToggle === 'function') {
                        this.options.onToggle({
                            value: this.getValue(),
                            label: this.options.statesLabel ? this.options.statesLabel[this.stateIndex] : this.options.states[this.stateIndex],
                            disabled: this.options.disabled
                        });
                    }
                }
            } else {
                // Clicked directly on the thumb; toggle to next state or stay
                this._toggleState();
            }
        });

        // Set cursor styles if disabled
        if (this.options.disabled) {
            this.track.style.opacity = 0.65;
            this.thumb.style.opacity = 0.86;
            this.track.style.cursor = 'not-allowed';
        } else this.track.style.cursor = 'pointer';
        // Call onInit callback if provided
        if (typeof this.options.onInit === 'function') {
            this.options.onInit({
                value: this.getValue(),
                label: this.options.statesLabel ? this.options.statesLabel[this.stateIndex] : this.options.states[this.stateIndex],
                disabled: this.options.disabled
            });
        }
    }

    _updateLabel() {
        if (this.options.statesLabel && this.labelInside) 
            this.labelInside.textContent = this.options.statesLabel[this.stateIndex];
        else 
            this.labelInside.textContent = '';
    }

    _updateUI() {
        this._applyStateStyles();

        const positionPercent = this.stateIndex / (this.options.states.length - 1);
        const thumbStyles = this.options.styles.thumb[this.stateIndex] || {};
        const thumbWidth = parseFloat(thumbStyles.width || '28');
        const trackStyles = this.options.styles.track[this.stateIndex] || {};
        const trackWidth = parseFloat(trackStyles.width || '60');

        const leftPosition = positionPercent * (trackWidth - thumbWidth);
        this.thumb.style.left = `${leftPosition}px`;

        this._updateLabel();
    }

    _toggleState() {
        this.stateIndex = (this.stateIndex + 1) % this.options.states.length;
        this._updateUI();

        // Call onToggle callback if provided
        if (typeof this.options.onToggle === 'function') {
            this.options.onToggle({
                value: this.getValue(),
                label: this.options.statesLabel ? this.options.statesLabel[this.stateIndex] : this.options.states[this.stateIndex],
                disabled: this.options.disabled
            });
        }
    }
    
    /**
     * Returns the value of the toggle switch
     *
     * @returns {Number} State number
     */
    getValue() {
        return this.options.states[this.stateIndex];
    }
    
    /**
     * Sets the state of the toggle switch
     *
     * @param {Number} index The state number of the toggle switch
     */
    setState(index) {
        if (index >= 0 && index < this.options.states.length) {
            this.stateIndex = index;
            this._updateUI();
        }
    }
    
    /**
     * Enable/Disable the toggle switch
     *
     * @param {Boolean} disabled TRUE if disabled, else FALSE
     */
    setDisabled(disabled) {
        this.isDisabled = disabled;
        this.track.style.cursor = disabled ? 'not-allowed' : 'pointer';
    }
}
