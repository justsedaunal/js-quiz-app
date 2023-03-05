import { questions } from "./data/questions.js";
import { answers } from "./data/answers.js";
import { options } from "./data/options.js";

let startButton = document.getElementById("startBtn");
let questionsText = document.getElementById("questions");
let questionWrapper = document.getElementById("question-wrapper");
let optionsNode = document.getElementById("options");
let previousBtn = document.getElementById("previousBtn");
let nextBtn = document.getElementById("nextBtn");
let showResultsBtn = document.getElementById("showResults");
showResultsBtn.classList.add("hidden");
let userAnswers = [];
let showResultsDiv = document.getElementById("show-results");
showResultsDiv.classList.add("hidden");
let resultQuestions = document.getElementById("result-questions");

function startBtn() {
  startButton.classList.add("hidden");
  let i = -1;
  i++;
  questionsText.innerHTML = questions[i].question;
  questionWrapper.classList.remove("hidden");
  createOptionButtons();
}

function createOptionButtons() {
  let i = -1;
  i++;
  options[i].options.forEach((element) => {
    let button = document.createElement("button");
    button.classList.add(
      "text-2xl",
      "border-2",
      "border-yellow-50",
      "p-2",
      "rounded-lg",
      "bg-green-50"
    );
    optionsNode.appendChild(button);
    button.innerText = element;
    button.setAttribute("id", element);

    // set onclick attribute to all available options
    let allOptions = optionsNode.children.length;
    // console.log(optionsNode.children[i]);
    for (i = 0; i < allOptions; i++) {
      optionsNode.children[i].setAttribute(
        "onclick",
        "showImportedMessage(this)"
      );
    }

    button.addEventListener("click", function () {
      const allOptions = optionsNode.children.length;
      for (let k = 0; k < allOptions; k++) {
        optionsNode.children[k].setAttribute("disabled", "true"); //once user select an option then disabled all options
      }
    });
  });
}
let i = 0;
function nextButton() {
  if (questions[i + 1]) {
    // console.log(options[i].options, i);
    // check if element exists before incrementing i
    i++;
    if (i == 2) {
      nextBtn.classList.add("hidden");
      showResultsBtn.classList.remove("hidden");
    }
    //element.style.backgroundImage = "url('" + opinions[i].img + "')";
    questionsText.innerHTML = questions[i].question;
    console.log(questions[i]);
    options[i].options.forEach((element) => {
      let button = document.createElement("button");
      button.classList.add(
        "text-2xl",
        "border-2",
        "border-yellow-50",
        "p-2",
        "rounded-lg",
        "bg-green-50"
      );
      optionsNode.appendChild(button);

      button.innerText = element;
      button.setAttribute("id", element);
      optionsNode.firstElementChild.remove();

      button.addEventListener("click", function () {
        const allOptions = optionsNode.children.length;
        for (let k = 0; k < allOptions; k++) {
          optionsNode.children[k].setAttribute("disabled", "true"); //once user select an option then disabled all options
        }
      });

      // set onclick attribute to all available options
      let allOptions = optionsNode.children.length;

      for (let i = 0; i < allOptions; i++) {
        optionsNode.children[i].setAttribute(
          "onclick",
          "showImportedMessage(this)"
        );
      }
    });
    // console.log(optionsNode);
  }
}

function prevButton() {
  console.log("click");
  if (questions[i - 1]) {
    console.log(options[i].options, i);
    // check if element exists before incrementing i
    i--;
    //element.style.backgroundImage = "url('" + opinions[i].img + "')";
    questionsText.innerHTML = questions[i].question;
    options[i].options.forEach((element) => {
      let button = document.createElement("button");
      button.classList.add(
        "text-2xl",
        "border-2",
        "border-yellow-50",
        "p-2",
        "rounded-lg",
        "hover:bg-green-200",
        "bg-green-50"
      );
      optionsNode.appendChild(button);

      button.innerText = element;
      button.setAttribute("id", element);
      optionsNode.firstElementChild.remove();

      button.addEventListener("click", function () {
        const allOptions = optionsNode.children.length;
        console.log(allOptions);
        for (let k = 0; k < allOptions; k++) {
          optionsNode.children[k].setAttribute("disabled", "true"); //once user select an option then disabled all options
        }
      });
    });
    console.log(optionsNode);
  }
}

function answerControl(answerParam) {
  console.log(answerParam);

  let userAnswerObject = {};

  let userAnswer = answerParam.textContent;
  let correctAnswer = answers[i].correctAnswer;
  console.log(userAnswers);
  if (userAnswer == correctAnswer) {
    //if user selected option is equal to array's correct answer
    answerParam.classList.add("bg-green-600"); //adding green color to correct selected option
    console.log("Correct Answer");
  } else {
    answerParam.classList.add("bg-red-600"); //adding green color to correct selected option
    console.log("Wrong Answer");
  }

  if (userAnswers != null) {
    userAnswers.push({
      userAnswer,
      questionNumber: questions[i].questionNumber,
      correctAnswer,
      question: questions[i].question,
    });
  }
}

function showResults() {
  showResultsBtn.classList.add("hidden");
  questionWrapper.classList.add("hidden");
  showResultsDiv.classList.remove("hidden");
  console.log(userAnswers);

  userAnswers.forEach((item) => {
    let resultQuestionDiv = document.createElement("div");
    let resultQuestionP = document.createElement("p");
    let currentAnswerDiv = document.createElement("h2");
    let resultQuestionContent = document.createTextNode(item.question);
    let correctAnswerContent = document.createTextNode(
      "doğru cevap " + item.correctAnswer
    );
    let userAnswerDiv = document.createElement("h3");
    let userAnswerContent = document.createTextNode(
      "verilen cevap " + item.userAnswer
    );

    resultQuestionDiv.classList.add("mt-3")
    currentAnswerDiv.classList.add("text-2xl" ,"border-2", "border-yellow-50", "p-2", "rounded-lg", "bg-green-50" ,"text-center","mx-auto");
    userAnswerDiv.classList.add("text-2xl", "border-2", "border-yellow-50", "p-2", "rounded-lg", "bg-green-50","text-center","mx-auto")
    resultQuestionP.classList.add("text-2xl", "text-center" ,"mb-3")

    resultQuestionDiv.appendChild(resultQuestionP);
    resultQuestionP.appendChild(resultQuestionContent);
    resultQuestions.appendChild(resultQuestionDiv);
    resultQuestionDiv.appendChild(currentAnswerDiv);
    resultQuestionDiv.appendChild(userAnswerDiv);

    currentAnswerDiv.appendChild(correctAnswerContent);
    userAnswerDiv.appendChild(userAnswerContent);
  });
}

startButton.addEventListener("click", startBtn);
nextBtn.addEventListener("click", nextButton);
showResultsBtn.addEventListener("click", showResults);
// previousBtn.addEventListener("click", prevButton);
export { answerControl };
