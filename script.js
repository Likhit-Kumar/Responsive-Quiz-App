var $progressValue = 0;
var resultList=[];
var timerr = document.getElementById("timer");

const quizdata=[
  {

    question:"Which attribute specifies a unique alphanumeric identifier to be associated with an element?",
    options:["class","id","article", "html"],
    answer:"id",
    category:2
  },
  {
    question:"The _____________ attribute specifies an inline style associated with an element, which determines the rendering of the affected element.",
    options:["dir", "class", "style", "article"],
    answer:"style",
    category:3
  },
  {
    question:"Which attribute is used to provide an advisory text about an element or its contents?",
    options:["title", "tooltip", "dir", "head"],
    answer:"title",
    category:1
  },
  {
    question:"The __________ attribute sets the text direction as related to the lang attribute.",
    options:["lang", "sub", "dir", "ds"],
    answer:"dir",
    category:3
  },
  {
    question:"Which attribute is not for overriding the actions?",
    options:["Formaction", "Style", "Tabindex", "Slot"],
    answer:"Slot",
    category:4
  },
  {
    question:"What application can one create even before the introduction of HTML5?",
    options:["Web Application", "Mobile Apllications", "Forms", "Browser based games"],
    answer:"Forms",
    category:3
  },
  {
    question:"What if one does not use the doctype in the starting of HTML document?",
    options:["Browser finds the document in quirky mode", "Browser finds a document in standard mode", "Browser stops working", "Browser crashes after showing the page"],
    answer:"Browser finds the document in quirky mode",
    category:1
  },
  {
    question:"Which feature was already introduced before HTML5?",
    options:["Canvas / SVG", "Video", "GeoLocation", "Frames"],
    answer:"Frames",
    category:4
  },
  {
    question:"Which of the following property specifies whether an element is an accelerator indicator or not.",
    options:["move", "@keyframes", "accelerator", "none of the mentioned"],
    answer:"accelerator",
    category:3
  },
  {
    question:"Which of the following property is used to define the animations that should be run?",
    options:["animation-delay", "animation-iteration-count", "animation-duration", "animation-name"],
    answer:"animation-name",
    category:4
  },
  {
    question:"Which of the following property defines the width of each column in a multicolumn text flow?",
    options:["width", "columns", "filter", "column-width"],
    answer:"column-width",
    category:4
  },
  {
    question:"Which of the following property defines the resampling method to use when stretching images?",
    options:["image-rendering", "ime-mode", "layout", "none of the mentioned"],
    answer:"image-rendering",
    category:1
  },
];

/** Random shuffle questions **/
function shuffleArray(question){
   var shuffled=question.sort(function() {
    return .5 - Math.random();
 });
   return shuffled;
}

function shuffle(a) {
  for (var i = a.length; i; i--) {
    var j = Math.floor(Math.random() * i);
    var _ref = [a[j], a[i - 1]];
    a[i - 1] = _ref[0];
    a[j] = _ref[1];
  }
}

/*** Return shuffled question ***/
function generateQuestions(){
  var questions=shuffleArray(quizdata);    
  return questions;
}

/*** Return list of options ***/
function returnOptionList(opts, i){

  var optionHtml='<li class="myoptions">'+
    '<input value="'+opts+'" name="optRdBtn" type="radio" id="rd_'+i+'">'+
    '<label for="rd_'+i+'">'+opts+'</label>'+
    '<div class="bullet">'+
      '<div class="line zero"></div>'+
      '<div class="line one"></div>'+
      '<div class="line two"></div>'+
      '<div class="line three"></div>'+
      '<div class="line four"></div>'+
    '</div>'+
  '</li>';

  return optionHtml;
}

/** Render Options **/
function renderOptions(optionList){
  var ulContainer=$('<ul>').attr('id','optionList');
  for (var i = 0, len = optionList.length; i < len; i++) {
    var optionContainer=returnOptionList(optionList[i], i)
    ulContainer.append(optionContainer);
  }
  $(".answerOptions").html('').append(ulContainer);
}

/** Render question **/
function renderQuestion(question){
  $(".question").html("<h1>"+question+"</h1>");
}

/** Render quiz :: Question and option **/
function renderQuiz(questions, index){ 
  var currentQuest=questions[index];  
  renderQuestion(currentQuest.question); 
  renderOptions(currentQuest.options); 
  console.log("Question");
  console.log(questions[index]);
}

/** Return correct answer of a question ***/
function getCorrectAnswer(questions, index){
  return questions[index].answer;
}

/** pushanswers in array **/
function correctAnswerArray(resultByCat){
  var arrayForChart=[];
  for(var i=0; i<resultByCat.length;i++){
   arrayForChart.push(resultByCat[i].correctanswer);
  }

  return arrayForChart;
}
/** Generate array for percentage calculation **/
function genResultArray(results, wrong){
  var resultByCat = resultByCategory(results);
  var arrayForChart=correctAnswerArray(resultByCat);
  arrayForChart.push(wrong);
  return arrayForChart
}


/** count right and wrong answer number **/
function countAnswers(results){

  var countCorrect=0, countWrong=0;

  for(var i=0;i<results.length;i++){
    if(results[i].iscorrect==true)  
        countCorrect++;
    else countWrong++;
  }

  return [countCorrect, countWrong];
}

/**** Categorize result *****/
function resultByCategory(results){

  var categoryCount = [];
  var ctArray=results.reduce(function (res, value) {
    if (!res[value.category]) {
        res[value.category] = {
            category: value.category,
            correctanswer: 0           
        };
        categoryCount.push(res[value.category])
    }
    var val=(value.iscorrect==true)?1:0;
    res[value.category].correctanswer += val; 
    return res;
  }, {});

  categoryCount.sort(function(a,b) {
    return a.category - b.category;
  });

  return categoryCount;
}


/** List question and your answer and correct answer  

*****/
function getAllAnswer(results){
    var innerhtml="";
    for(var i=0;i<results.length;i++){

      var _class=((results[i].iscorrect)?"item-correct":"item-incorrect");
       var _classH=((results[i].iscorrect)?"h-correct":"h-incorrect");
      

      var _html='<div class="_resultboard '+_class+'">'+
                  '<div class="_header">'+results[i].question+'</div>'+
                  '<div class="_yourans '+_classH+'">'+results[i].clicked+'</div>';

        var html="";
       if(!results[i].iscorrect)
        html='<div class="_correct">'+results[i].answer+'</div>';
       _html=(_html+html)+'</div>';
       innerhtml+=_html;
    }

  $(".allAnswerBox").html('').append(innerhtml);
}
/** render  Brief Result **/
function renderResult(resultList){ 
  
  var results=resultList;
  console.log(results);
  var countCorrect=countAnswers(results)[0], 
  countWrong=countAnswers(results)[1];
  
  
  renderBriefChart(countCorrect, resultList.length, countWrong);
}

function renderChartResult(){
   var results=resultList; 
  var countCorrect=countAnswers(results)[0], 
  countWrong=countAnswers(results)[1];
  var dataForChart=genResultArray(resultList, countWrong);
  renderChart(dataForChart);
}

/** Insert progress bar in html **/
function getProgressindicator(length){
  var progressbarhtml=" ";
  for(var i=0;i<length;i++){
    progressbarhtml+='<div class="my-progress-indicator progress_'+(i+1)+' '+((i==0)?"active":"")+'"></div>';
  }
  $(progressbarhtml).insertAfter(".my-progress-bar");
} 

/*** change progress bar when next button is clicked ***/
function changeProgressValue(){
  $progressValue+= 9;
  if ($progressValue >= 100) {
    
  } else {
    if($progressValue==99) $progressValue=100;
    $('.my-progress')
      .find('.my-progress-indicator.active')
      .next('.my-progress-indicator')
      .addClass('active');      
    $('progress').val($progressValue);
  }
  $('.js-my-progress-completion').html($('progress').val() + '% complete');

}   
function addClickedAnswerToResult(questions,presentIndex,clicked ){
  var correct=getCorrectAnswer(questions, presentIndex);
    var result={
      index:presentIndex,
      question:questions[presentIndex].question, 
      clicked:clicked,
      iscorrect:(clicked==correct)?true:false,
      answer:correct, 
      category:questions[presentIndex].category
    }
    resultList.push(result);

    console.log("result");
    console.log(result);
      
}

$(document).ready(function() {
  
  var presentIndex=0;
   var clicked=0;

  var questions=generateQuestions();
  renderQuiz(questions, presentIndex);
  getProgressindicator(questions.length);

  $(".answerOptions ").on('click','.myoptions>input', function(e){
    clicked=$(this).val();   

    if(questions.length==(presentIndex+1)){
      $("#submit").removeClass('hidden');
      $("#next").addClass("hidden");
    }
    else{
      $("#next").removeClass("hidden");
    }

     
  
  });



  $("#next").on('click',function(e){
    e.preventDefault();
    addClickedAnswerToResult(questions,presentIndex,clicked);

    $(this).addClass("hidden");
    
    presentIndex++;
    renderQuiz(questions, presentIndex);
    changeProgressValue();
  });

  $("#submit").on('click',function(e){
     addClickedAnswerToResult(questions,presentIndex,clicked);
    $('.multipleChoiceQues').hide();
    $(".resultArea").show();
    renderResult(resultList);

  });

  
  

   $(".resultArea").on('click','.viewchart',function(){
      $(".resultPage2").show();
       $(".resultPage1").hide();
       $(".resultPage3").hide();
       renderChartResult();
   });

    $(".resultArea").on('click','.backBtn',function(){
      $(".resultPage1").show();
       $(".resultPage2").hide();
       $(".resultPage3").hide();
        renderResult(resultList);
   });

    $(".resultArea").on('click','.viewanswer',function(){
      $(".resultPage3").show();
       $(".resultPage2").hide();
       $(".resultPage1").hide();
        getAllAnswer(resultList);
   });

  $(".resultArea").on('click','.replay',function(){
    window.location.reload(true);
  });

});

/** Total score pie chart**/
function totalPieChart(_upto, _cir_progress_id, _correct, _incorrect) {

  $("#"+_cir_progress_id).find("._text_incor").html("Incorrect : "+_incorrect);
  $("#"+_cir_progress_id).find("._text_cor").html("Correct : "+_correct);

  var unchnagedPer=_upto;
  
   _upto = (_upto > 100) ? 100 : ((_upto < 0) ? 0 : _upto);

   var _progress = 0;

   var _cir_progress = $("#"+_cir_progress_id).find("._cir_P_y");
   var _text_percentage = $("#"+_cir_progress_id).find("._cir_Per");

   var _input_percentage;
   var _percentage;

   var _sleep = setInterval(_animateCircle, 25);

   function _animateCircle() {
     //2*pi*r == 753.6 +xxx=764
       _input_percentage = (_upto / 100) * 764;
       _percentage = (_progress / 100) * 764;

       _text_percentage.html(_progress + '%');

       if (_percentage >= _input_percentage) {
            _text_percentage.html('<tspan x="50%" dy="0em">'+unchnagedPer + '% </tspan><tspan  x="50%" dy="1.9em">Your Score</tspan>');
           clearInterval(_sleep);
       } else {

           _progress++;

           _cir_progress.attr("stroke-dasharray",_percentage + ',764');
       }
   }
}

function renderBriefChart(correct, total, incorrect){
 var percent=(100 * correct / total);
 if(Math.round(percent) !== percent) {
         percent = percent.toFixed(2);
 }

totalPieChart(percent, '_cir_progress', correct, incorrect)
  
}
/*** render chart for result **/
function renderChart(data){
 var ctx = document.getElementById("myChart");
 var myChart = new Chart(ctx, {
   type: 'doughnut',
   data: {
   labels: [ "Verbal communication", 
             "Non-verbal communication", 
             "Written communication", 
             "Incorrect"
           ],
   datasets: [
               {
                
                 data: data,
                 backgroundColor: [  '#e6ded4',
                                     '#968089',
                                     '#e3c3d4',
                                     '#ab4e6b'
                                   ],
                 borderColor: [  'rgba(239, 239, 81, 1)',
                                 '#8e3407',
                                 'rgba((239, 239, 81, 1)',
                                 '#000000'
                               ],
                 borderWidth: 1
               }
             ]
   },
   options: {
        pieceLabel: {
         render: 'percentage',
         fontColor: 'black',
         precision: 2
       }
     }
   
 });
}

setTimeout(startTimer,1000);	


function startTimer()
{
  var min = 4;
  var sec = 59;
  var m;
  var s;
  intTag = setInterval(function(){
    sec -= 1;
    if(sec==-1)
    {
      min -= 1;
      sec = 60;
    }
    m = (min<10) ? ("0"+min):min;
    s = (sec<10) ? ("0"+sec):sec;
    timerr.innerHTML = m+":"+s;

  },1000);
}
setInterval(function(){
  if(timerr.innerHTML == "00:00")
  {
    terminateQuiz();
    //submit
    swal("Oops!", "Submitted due to end of Time", "error");

  }
},1000);

function terminateQuiz()
{
    counter = 0;
    score = 0;
     clearInterval(intTag);
     timerr.innerHTML = "--:--";
}

