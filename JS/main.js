// обработчик - добавить новый плеер
open_player.onclick = () => {
    // создаем элемент в разметке для добавления в него плеера
    let clone = document.createElement('div')
    document.body.append(clone)
    // создаем теневой DOM и добавляем в него шаблон плеера
    clone.attachShadow({mode: 'open'})
    clone.shadowRoot.append(player_template.content.cloneNode(true))
    // запускаем функцию - обработчик событий плеера
    player(clone.shadowRoot)
}

// основная функция плеера
function player(elem) {
    // путь к файлу
    let file_href = elem.getElementById('source').getAttribute("src")
    // имя файла
    let title = file_href.substring((file_href.lastIndexOf("/") + 1), file_href.length)
     // имя трека без расширения файла
    let track_name = title.substring(0, (title.lastIndexOf(".")))
    elem.getElementById("title").textContent = track_name
    let progress = elem.getElementById('progress')
    progress.value = 1
    let speed = elem.getElementById('speed')
    speed.value = 1
    let volume_bar = elem.getElementById("volume_bar")
    volume_bar.style.display = 'none'
    volume_bar.value = 50
    let audio_player = elem.getElementById("audio_player")
    audio_player.volume = 50/100
    let play = elem.getElementById("play"),
        pause = elem.getElementById("pause"),
        volume = elem.getElementById("volume"),
        current_time = elem.getElementById("current_time"),
        full_time = elem.getElementById("full_time"),
        download = elem.getElementById("download"),
        upload = elem.getElementById("upload")
    audio_player.currentTime = 1


    //запуск воспроизведения
    play.onclick = () => {
        audio_player.play()
        play.style.display = "none"
        pause.style.display = "block"
    }
    // пауза
    pause.onclick = () => {
        audio_player.pause()
        pause.style.display = "none"
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
    }
    // отображение регулятора громкости
    volume.onclick = () => {
        volume_bar.style.display = volume_bar.style.display === 'none' ? 'block' : 'none'
    }
    // изменение стиля и громкости воспроизведения в зависимости от положения регулятора
    volume_bar.oninput = () => {
        let color_volume = 'linear-gradient(90deg, #cc64b7 ' + volume_bar.value + '%, #404040 ' + volume_bar.value + '%)'
        volume_bar.style.background = color_volume
        audio_player.volume = volume_bar.value / 100
    }
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
    }
    // имитация загрузки файла
    upload.onclick = () => {
        alert('отправить файл')
    }
}
