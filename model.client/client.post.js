/*
/!**
 * Created by a on 1/18/17.
 *!/


var clientPostSchema = ({
    user_id: String,
    contents: { type: String, default: "Content empty" },
    tag: { type : [], default: "IU" },
    image: { type: String, default: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT_sT3J6WYIzUcchaGDc9h_sSeIRCSeLEAcV4mRA3VHulwwFcJtLQ"},
    comments: { type: [Number], default: [1] },
    reg_time: { type: Date, default: Date.now },
});




module.exports = clientPostSchema;

*/


function clientPost (){
        
}