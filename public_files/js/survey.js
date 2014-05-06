var questions = null, current_question = 0;
	var tag = "";
	var lock = null;
	var answers = [];
	var alertMessage = 'Please answer this question';

	function start_again() {
		answers = [];
		tag = "";
		lock = null;
		current_question = 0;
		display_next_question();
	}

	function send_answers() {
		$.post('/answers', JSON.stringify(answers))
		.done(function(data) {
			var html = "<br/>"+"Your data successfully submitted."+"<hr/>"+"Thank you for taking this survey!";
			//var html = "Your data successfully submitted. <br/> Would you like to start again? <br/>" +
			//"<input type='button' onclick='start_again()' value='Yes' >";
			$('#main').html(html)
		});
	}

	function display_end() {
		var display_html = "<br/>"+"Survey Ended. " 
				+ "<hr/><div class='wrapper0'><input type = 'button' class='send_btn' onclick='send_answers()' value='Send answers'/></div>";
		$('#main').html(display_html);
		//$.get('/end.html', function(data){$('#main').html(data);});
	}

	function validate_and_next() {
		if(current_question >= questions.length) {
			return display_end();
		}

		var next_function = display_next_question;
		if(current_question >= questions.length)
			next_function = send_answers;
		var answer = null;

		var question = questions[current_question-1];
		if(question.type == "radio") {
			var radio = $("input[name='radio_question']:checked");
			if (radio.length > 0){
			  answer = radio.val();
			 
			} else {
				alert(alertMessage);
				return;
			}
		} else if(question.type == "scale") {
			var scale = $("input[name='scale_question']:checked");
			if (scale.length > 0){
				answer = scale.val();
			} else {
				alert(alertMessage);
				return;
			}
		} else if(question.type == "pattern") {
			var pattern = lock.getPattern();
			if(pattern.length > 0) {
				answer = pattern;
			} else {
				alert(alertMessage);
				return;
			}
		}

		if(answer != null) {
			answers.push({question_id:question._id, answer:answer});
			if(question.setTag) {
				tag = "#" + question._id + answer.toLowerCase().replace(/ /g, "");
			}
			display_next_question();
		}
	}

	function display_next_question() {
		var display_html = "" + "<div class='section'>" + questions[current_question].section + "</div>";
		var question = questions[current_question];
	
		if(question.tag == "#all" || question.tag == tag) {
			if(question.type == "pattern") {
				display_html += "<div class='text'>" + "&nbsp;&nbsp;" + question.text + "</div><hr/>";
				display_html += "<div id='patternContainer'> </div>"

				if(current_question + 1 < questions.length)
					//display_html += "<hr/> + " + ('#submit_btn');
					display_html += "<hr/><div class='wrapper1'><input type='button'  class='next_btn1' onclick='validate_and_next()' value='Next question'/></div>";
					
				else
					display_html += "<hr/><div class='wrapper2'><input type='button' class='next_btn2' onclick='send_answers()' value='Submit' /></div>"

				$('#main').html(display_html);
				lock = new PatternLock("#patternContainer");
			}
			else {
				if(question.type == "radio") {
					var radio_btn_count=0;
					display_html += "<div class='text'>" + "&nbsp;&nbsp;" + question.text + "</div><hr/>";
					display_html += "<div class='radio_question'>";
					question.answers.forEach(function (answer) {
						display_html += "<input type='radio' id='radio"+radio_btn_count+"' name='radio_question' value='"+ answer + "'>" + "<label for='radio"+radio_btn_count+"'>"+answer+"</label>" + "<br/>";
						radio_btn_count++;
					});
					display_html += "</div>";
				} else if(question.type == "scale") {
					var scale_btn_count=0;
					display_html += "<div class='text'>" + "&nbsp;&nbsp;" + question.text + "</div><hr/>";
					display_html += "<div class='scale_question'>";
					question.answers.forEach(function (answer) {
						display_html += "<input type='radio' id='scale"+scale_btn_count+"' name='scale_question' value='"+ answer + "'>" + "<label for='scale"+scale_btn_count+"'>"+answer+"</label>" + "<br/>";
						scale_btn_count++;
					});
					display_html += "</div>";
				}			

				if(current_question + 1 < questions.length)
					//display_html += "<hr/> + " + submit_btn;
					display_html += "<hr/><div class='wrapper3'><input type='button'  class='next_btn3' onclick='validate_and_next()' value='Next question'/></div>";
				else
					display_html += "<hr/><div class='wrapper4'><input type='button' class='next_btn4' onclick='send_answers()' value='Submit' /></div>"
				$('#main').html(display_html);
			}
		} else {
			if(current_question + 1 >= questions.length) {
				
				return display_end();
			}
			current_question++;
			return display_next_question();
		}
		current_question++;
	}

	function start_survey() {
		$.get("/questions", function(data) {
			questions = $.parseJSON(data);
			console.log("loading is done.");
			display_next_question();
		});
	}