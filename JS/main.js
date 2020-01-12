// создаем кастом - элемент плеера с тегом <audio-player>
customElements.define('audio-player',
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById('player_template').content;
            const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(document.importNode(template, true));
        }
        connectedCallback() {
            player(this.shadowRoot);
        }
    }
);

// обработчик - добавить новый плеер
open_player.onclick = function() {
    let player_teg = document.createElement('audio-player');
    player_box.append(player_teg);
};

// основная функция плеера
function player(elem) {
    let audio_player = elem.getElementById('audio_player');
    audio_player.currentTime = 1;
    let audio_file = elem.getElementById('audio_file');
    // запуск инпута выбора файла
    let file_open = elem.getElementById('file_open');
    file_open.onclick = function() {
        audio_file.click()
    };
    // добавление выбранного файла в плеер
    audio_file.onchange = function() {
        let files = this.files;
        let file = URL.createObjectURL(files[0]);
        if (files[0].name.substring(files[0].name.lastIndexOf("."), files[0].name.length) != '.mp3') {
            alert('неверный формат файла');
            return
        };
        elem.getElementById("title").textContent = files[0].name.substring(0, (files[0].name.lastIndexOf(".")));
        audio_player.src = file;
            play.click();
    };
    let progress = elem.getElementById('progress')
    progress.value = 1
    let speed = elem.getElementById('speed')
    speed.value = 1
    let volume_bar = elem.getElementById("volume_bar")
    volume_bar.style.display = 'none'
    volume_bar.value = 50
    let play = elem.getElementById("play"),
        pause = elem.getElementById("pause"),
        volume = elem.getElementById("volume"),
        current_time = elem.getElementById("current_time"),
        full_time = elem.getElementById("full_time"),
        download = elem.getElementById("download"),
        upload = elem.getElementById("upload"),
        close = elem.getElementById("close");

    //запуск воспроизведения
    play.onclick = function() {
        audio_player.play()
        this.style.display = "none"
        pause.style.display = "block"
    }
    // пауза
    pause.onclick = function() {
        audio_player.pause()
        this.style.display = "none"
        play.style.display = "block"
    }
    //выбор скорости воспроизведения
    speed.oninput = () => {
        audio_player.playbackRate = speed.value
    }
    // изменение стиля прогресса при его изменениии
    progress.oninput = () => {
        let color = 'linear-gradient(90deg, #cc64b7 ' + progress.value + '%, #ffff ' + progress.value + '%)'
        progress.style.background = color
        let pos = (audio_player.duration / 100) * progress.value
        audio_player.currentTime = pos
    }
    // вспомогательная функция преобразования времени в секундах в нужный формат
    function calcTime(num) {
        function formatTime(t) {
            t = Math.floor(t)
            return t < 10 ? '0' + t : t
        }
        let min = formatTime(num / 60 % 60)
        let sec = formatTime(num % 60)
        return min + ":" + sec
    }
    // отображение временных параметров воспроизведения
    audio_player.ontimeupdate = () => {
        let full = audio_player.duration
        let current = audio_player.currentTime
        full_time.textContent = calcTime(full)
        current_time.textContent = calcTime(current)
        progress.value = (current / full) * 100
        let color = 'linear-gradient(90deg, #cc64b7 ' + progress.value + '%, #ffff ' + progress.value + '%)'
        progress.style.background = color
    };
    // отображение регулятора громкости
    volume.onclick = () => {
        volume_bar.style.display = volume_bar.style.display === 'none' ? 'block' : 'none'
    };
    // изменение стиля и громкости воспроизведения в зависимости от положения регулятора
    volume_bar.oninput = () => {
        let color_volume = 'linear-gradient(90deg, #cc64b7 ' + volume_bar.value + '%, #404040 ' + volume_bar.value + '%)'
        volume_bar.style.background = color_volume
        audio_player.volume = volume_bar.value / 100
    };
    // скачивание файла
    download.onclick = () => {
        var link = document.createElement("a")
        link.contentType = "application/octet-stream"
        link.download = title
        link.href = file_href
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    };
    // имитация загрузки файла
    upload.onclick = () => {
        alert('отправить файл')
    };
    // удаляем тег <audio_player>, который является хостом для данного shadowRoot
    close.onclick = function () {
        elem.host.remove();
    }
}
