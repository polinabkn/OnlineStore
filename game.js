// quiz is imported from quiz.js

class Game {
	constructor () {
		this.game_step = 0;
		this.player_rate = 0;
	}

	rateToDiscount() {
		const borders = { 0: 2, 10: 5, 20: 7, 40: 10, 50: 12, 65: 14, 75: 15, 100: 20};
		for (let border in borders) {
			if (border > this.player_rate)
				return borders[border];
		}
	}

	renderQuestion() {
		console.log(this);
		let q = quiz[this.game_step];
		const answers = q.answers.map((el) => {return el.text});
		document.querySelector(".test").innerHTML = `
					<div class="test-progress" style="width: ${(this.game_step+1) * 100.0 / (quiz.length+1)}%"></div>
					<div class="q-meta">Вопрос <span class="q-num">${this.game_step+1}</span> из ${quiz.length}</div>
					<div class="q-card">
						<div class="q">
							${q.q}
						</div>
						<div class="answers">` + 
							answers.map((el) => {return `<div onclick="game.newAnswer(${answers.indexOf(el)})" class="answer">
								${el}</div>`}).join("")
						+ `
						</div>
					</div>
		`
	}

	newAnswer(num) {
		let question = quiz[this.game_step];
		this.player_rate += question.answers[num].value;
		this.game_step += 1;
		if (this.game_step >= quiz.length)
			this.gameFinish();
		else
			this.renderQuestion();
	}

	gameFinish() {
		document.querySelector(".test").innerHTML = `
					<div class="test-progress" style="width: 100%"></div>
					<div class="q-meta">Все вопросы пройдены</div>
					<div class="q-card">
						<div class="result">
							Вау! Вы нормальный такой сладкоежка. Ваш результат: <span class="result-count">${this.player_rate}</span> баллов.
							 И Вы получаете скидку <strong>${this.rateToDiscount()}%</strong> на покупку автомата сахарной ваты!! WOW<br>
							 Кликните кнопку и напишите продавцу код "IRATING${this.player_rate}"
						</div>
						<br><br>
						<button class="our-button" onclick="onBuyClick()">Купить со скидкой!</button>
					</div>
		`
	}
}

function runTest() {
	game = new Game();
	game.renderQuestion();
}

document.addEventListener('DOMContentLoaded', runTest)