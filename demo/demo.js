const toggle = new ToggleJS('#myToggle', {
    states: [0, 1],
    statesLabel: ['Off','On'],
    current: 1,
    disabled: false,
    onToggle: (c)=>{
        console.log(c);
    },
    onInit: ((i)=>{
        console.log(i);
    }),
    styles:{
        track:{
            0:{
                width: '60px',
                height: '30px',
                borderRadius: '15px',
                backgroundColor: '#ccc'
            },
            1:{
                width: '60px',
                height: '30px',
                borderRadius: '15px',
                backgroundColor: '#95d0dcff'
            }
        },
        thumb:{
            0:{
                width: '28px',
                height: '28px',
                backgroundColor: '#f2f2f2ff',
                borderRadius: '50%'
            },
            1:{
                width: '28px',
                height: '28px',
                backgroundColor: '#479ae7ff',
                borderRadius: '50%'
            }
        }
    }
});
