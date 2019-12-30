// подключаем элементы управления и некоторые инициализируем
let audio = document.querySelector("#audio_player")
// путь к файлу
let file_href = document.getElementById("source").getAttribute("src")
// имя файла
let title = file_href.substring((file_href.lastIndexOf("/") + 1), file_href.length)
// имя трека без расширения файла
let track_name = title.substring(0, (title.lastIndexOf(".")))
document.getElementById("title").textContent = track_name

let play_bottom = document.getElementById("play")
let pause_bottom = document.getElementById("pause")
let currentTime = document.getElementById("current-time")
let progress = document.getElementById("progress")
progress.value = 1
let fullTime = document.getElementById("full-time")
let speed_bottom = document.getElementById("speed")
speed_bottom.value = 1
let volume_bottom = document.getElementById("volume")
let volume_range = document.getElementById("volume-bar")
volume_range.style.display = 'none'
let volume = document.getElementById("volume-bar")
volume.value = 50
audio.volume = 50/100
let download_button = document.getElementById("download")
let upload_button = document.getElementById("upload")

//запуск воспроизведения
play_bottom.onclick = () => {
    audio.play()
    play_bottom.style.display = "none"
    pause_bottom.style.display = "block"
}
// пауза
pause_bottom.onclick = () => {
    audio.pause()
    pause_bottom.style.display = "none"
    play_bottom.style.display = "block"
}
//выбор скорости воспроизведения
speed_bottom.oninput = () => {
    audio.playbackRate = speed_bottom.value
}
// изменение стиля прогресса при его изменениии
progress.oninput = () => {
    let color = 'linear-gradient(90deg, #cc64b7 ' + progress.value + '%, #ffff ' + progress.value + '%)'
    progress.style.background = color
    let pos = (audio.duration / 100) * progress.value
    audio.currentTime = pos
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
audio.ontimeupdate = () => {
    let full = audio.duration
    let current = audio.currentTime
    fullTime.textContent = calcTime(full)
    currentTime.textContent = calcTime(current)
    progress.value = (current / full) * 100
    let color = 'linear-gradient(90deg, #cc64b7 ' + progress.value + '%, #ffff ' + progress.value + '%)'
    progress.style.background = color
}
// отображение регулятора громкости
volume_bottom.onclick = () => {
    volume_range.style.display = volume_range.style.display === 'none' ? 'block' : 'none'
}
// изменение стиля и громкости воспроизведения в зависимости от положения регулятора
volume.oninput = () => {
    let color_volume = 'linear-gradient(90deg, #cc64b7 ' + volume.value + '%, #404040 ' + volume.value + '%)'
    volume.style.background = color_volume
    audio.volume = volume.value / 100
}
// скачивание файла
download_button.onclick = () => {
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
upload_button.onclick = () => {
    alert('отправить файл')
}


