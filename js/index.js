document.addEventListener('DOMContentLoaded', function() {
    const moodLabel = {
        good: 'いい',
        soso: 'まあまあ',
        bad: 'わるい'
    };
    const moodSelection = document.getElementById('mood-selection');
    const commentDisplay = document.getElementById('comment-display');
    const noteScreen = document.getElementById('note-screen');
    const calendarScreen = document.getElementById('calendar-screen');
    const dayDetails = document.getElementById('day-details');
    const moodText = document.getElementById('mood-text');
    const moodImage = document.getElementById('mood-image');
    
    let currentMood = null; // 現在のムードを追跡する変数
    
    const moodData = {
        good: {
            comments: ["きょうも1にちがんばったね", "えがおがすてき", "このちょうしだよ"],
            image: "./img/good2.png"
        },
        soso: {
            comments: ["きょうはなにがおこるかな", "きらくにいこう", "いつもどおりでいいよ"],
            image: "./img/soso2.png"
        },
        bad: {
            comments: ["きょうはゆっくりやすもうね", "だいじょうぶ、いっぽずつ", "いきてるだけですごいんだよ"],
            image: "./img/bad2.png"
        }
    };
    
    document.querySelectorAll('.mood-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            currentMood = this.dataset.mood; // ムードを更新
            const randomIndex = Math.floor(Math.random() * moodData[currentMood].comments.length);
            moodText.textContent = moodData[currentMood].comments[randomIndex];
            moodImage.src = moodData[currentMood].image;
            moodSelection.style.display = 'none';
            commentDisplay.style.display = 'block';
        });
    });
    
    document.getElementById('write-note').addEventListener('click', function() {
        commentDisplay.style.display = 'none';
        noteScreen.style.display = 'block';
    });
    
    document.getElementById('save-note').addEventListener('click', function() {
        const noteInput = document.getElementById('note-input');
        const now = new Date();
        const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dateStr = localDate.toISOString().split('T')[0];
        localStorage.setItem(dateStr, JSON.stringify({
            note: noteInput.value,
            mood: moodText.textContent,
            moodLabel: currentMood // 現在のムードを保存
        }));
        noteInput.value = '';
        noteScreen.style.display = 'none';
        moodSelection.style.display = 'block';
    });
    
    document.getElementById('calendar-btn').addEventListener('click', function() {
        moodSelection.style.display = 'none';
        commentDisplay.style.display = 'none';
        noteScreen.style.display = 'none';
        dayDetails.style.display = 'none';
        displayCalendar();
        calendarScreen.style.display = 'block';
    });
    
    function displayCalendar() {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = ''; // Clear previous calendar entries
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    
        for (let day = monthStart; day <= monthEnd; day.setDate(day.getDate() + 1)) {
            const dateStr = day.toISOString().split('T')[0];
            const dayData = JSON.parse(localStorage.getItem(dateStr));
            const dayElem = document.createElement('div');
            dayElem.textContent = day.getDate() + (dayData ? `: ${moodLabel[dayData.moodLabel]}` : ": きろくはないよ");
            dayElem.addEventListener('click', () => {
                displayDayDetails(dateStr);
            });
            calendar.appendChild(dayElem);
        }
    }
    
    function displayDayDetails(dateStr) {
        const data = JSON.parse(localStorage.getItem(dateStr));
        document.getElementById('selected-day-mood').textContent = data ? `Mood: ${moodLabel[data.moodLabel]}` : "きぶんのきろくはないよ";
        document.getElementById('selected-day-note').textContent = data ? `Note: ${data.note}` : "メモのきろくはないよ";
        commentDisplay.style.display = 'none';
        noteScreen.style.display = 'none';
        dayDetails.style.display = 'none';
        calendarScreen.style.display = 'none';
        dayDetails.style.display = 'block';
    }
    });
    