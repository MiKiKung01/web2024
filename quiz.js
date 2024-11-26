$(document).ready(function () {
    let questions = [];
    let userAnswers = [];

    // โหลดคำถามจากไฟล์ JSON
    $.getJSON("questions.json", function (data) {
        questions = data.questions;
    });

    // เริ่มทำแบบทดสอบ
    $("#start-btn").click(function () {
        $("#start-screen").addClass("d-none");
        $("#quiz-screen").removeClass("d-none");
        loadQuestions();
    });

    // โหลดคำถาม
    function loadQuestions() {
        const container = $("#questions-container");
        container.empty(); // ล้างข้อมูลเก่า
        userAnswers = []; // รีเซ็ตคำตอบ

        questions.forEach((q, index) => {
            const questionHtml = `
          <div class="mb-4">
            <h5>${index + 1}. ${q.question}</h5>
            ${q.choices
                    .map(
                        (choice, i) => `
              <div class="form-check">
                <input class="form-check-input" type="radio" name="question${index}" value="${i}">
                <label class="form-check-label">${choice}</label>
              </div>
            `
                    )
                    .join("")}
          </div>
        `;
            container.append(questionHtml);
        });

        // แสดงปุ่มส่งคำตอบ
        $("#submit-btn").removeClass("d-none");
    }

    // ตรวจคำตอบ
    $("#submit-btn").click(function () {
        let score = 0;

        questions.forEach((q, index) => {
            const selected = $(`input[name="question${index}"]:checked`).val();
            userAnswers[index] = parseInt(selected);
            if (userAnswers[index] === q.answer) {
                score++;
            }
        });

        // แสดงผลลัพธ์
        $("#quiz-screen").addClass("d-none");
        $("#result-screen").removeClass("d-none");
        $("#score").text(`คุณได้คะแนน ${score} / ${questions.length}`);
    });

    // รีเซ็ตแบบทดสอบ
    $("#restart-btn").click(function () {
        $("#result-screen").addClass("d-none");
        $("#start-screen").removeClass("d-none");
    });
});
