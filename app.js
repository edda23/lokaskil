
const synth = new Tone.Synth().toDestination();

const C4S = () => {

    const now = Tone.now();

    synth.triggerAttackRelease("c#4", "8n", now);
    }

    const note_playing = new Tone.Synth().toDestination();

        function playNote(note) {
            const now = Tone.now();
            note_playing.triggerAttackRelease(note, "8n", now);
        }

        document.getElementById('keyboardDiv').addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON') {
                const note = event.target.id;
                playNote(note);
            }
        });
   
                function playNote(note) {
            const now = Tone.now();
            synth.triggerAttackRelease(note, "8n", now);
        }

        const keyboardMap = {
            'a': 'C4',
            'w': 'C#4',
            's': 'D4',
            'e': 'D#4',
            'd': 'E4',
            'f': 'F4',
            't': 'F#4',
            'g': 'G4',
            'y': 'G#4',
            'h': 'A4',
            'u': 'Bb4',
            'j': 'B4',
            'k': 'C5',
            'o': 'C#5',
            'l': 'D5',
            'p': 'D#5',
            ';': 'E5'
        };

        document.addEventListener('keydown', function(event) {
            const key = event.key.toLowerCase();
            if (keyboardMap.hasOwnProperty(key)) {
                const note = keyboardMap[key];
                playNote(note);
            }
        });

        let recording = false;
        let recordedTune = [];

        function startRecording() {
            recording = true;
            recordedTune = [];
            document.getElementById('recordbtn').disabled = true;
            document.getElementById('stopbtn').disabled = false;
        }

        function stopRecording() {
            recording = false;
            document.getElementById('recordbtn').disabled = false;
            document.getElementById('stopbtn').disabled = true;

            const tuneName = document.getElementById('recordName').value || "No-name Tune";
            uploadTune(tuneName, recordedTune);
        }   

        async function uploadTune(tuneName, tuneData) {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/upload', {
                    name: tuneName,
                    tune: tuneData
                });
                populateDropdown();
            } catch (error) {
                console.error('Error uploading tune:', error);
            }
        }

        document.getElementById('recordbtn').addEventListener('click', startRecording);
        document.getElementById('stopbtn').addEventListener('click', stopRecording);

     