const fileInput = document.getElementById('file-input');
        const dropArea = document.getElementById('drop-area');
        const output = document.getElementById('output');
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');

        // Обработчик файлов
        const handleFiles = (files) => {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    output.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        };

        // События выбора файла и перетаскивания
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
        dropArea.addEventListener('dragover', (e) => e.preventDefault());
        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
        });

        // Получение местоположения
        document.getElementById('get-location').addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => alert(`Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`),
                    (error) => alert('Ошибка: ' + error.message)
                );
            } else {
                alert("Геолокация не поддерживается.");
            }
        });

        // Захват фото
        document.getElementById('take-photo').addEventListener('click', async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.style.display = 'block';

            // Получаем кадр через 2 секунды
            setTimeout(() => {
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                const photo = canvas.toDataURL('image/png');
                const img = document.createElement('img');
                img.src = photo;
                output.appendChild(img);
                stream.getTracks().forEach(track => track.stop());
                video.style.display = 'none';
            }, 2000);
        });