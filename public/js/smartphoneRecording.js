import {listenSendButton} from "./smartphoneEventListener.js";
let listObject;
let $ = jQuery;

$(document).ready(function () {
    let myRecorder = {
        objects: {
            context: null,
            stream: null,
            recorder: null
        },
        init: function () {
            if (null === myRecorder.objects.context) {
                myRecorder.objects.context = new (
                    window.AudioContext || window.webkitAudioContext
                );
            }
        },
        start: function () {
            let options = {audio: true, video: false};
            navigator.mediaDevices.getUserMedia(options).then(function (stream) {
                myRecorder.objects.stream = stream;
                myRecorder.objects.recorder = new Recorder(
                    myRecorder.objects.context.createMediaStreamSource(stream),
                    {numChannels: 1}
                );
                myRecorder.objects.recorder.record();
            }).catch(function (err) {});
        },
        stop: function (listObject) {
            if (null !== myRecorder.objects.stream) {
                myRecorder.objects.stream.getAudioTracks()[0].stop();
            }
            if (null !== myRecorder.objects.recorder) {
                myRecorder.objects.recorder.stop();

                // Validate object
                if (null !== listObject
                    && 'object' === typeof listObject
                    && listObject.length > 0) {

                    // Export the WAV file
                    myRecorder.objects.recorder.exportWAV(function (blob) {
                        let reader = new window.FileReader();
                        let base64Audio;
                        reader.readAsDataURL(blob);
                        reader.onloadend = function() {
                            base64Audio = reader.result;
                            base64Audio = base64Audio.split(',')[1];
                            listenSendButton(base64Audio);
                        }
                        let url = (window.URL || window.webkitURL)
                            .createObjectURL(blob);

                        let audioObject = $('<audio controls ></audio>')
                            .attr('src', url);

                        let sendObject = $('<form id="sendVocal"><button class="btn"><i class="fas fa-paper-plane"></i>Add to Library</button></form>');

                        let holderObject = $('<div id="holderObject"></div>')
                            .append(audioObject)
                            .append(sendObject)

                        listObject.append(holderObject);

                    });
                }
            }
        }
    };

    // Prepare the recordings list
    listObject = $('[data-role="recordings"]');

    // Prepare the record button
    $('[data-role="controls"] > button').click(function () {
        // Initialize the recorder
        myRecorder.init();

        // Get the button state
        let buttonState = !!$(this).attr('data-recording');

        // Toggle
        if (!buttonState) {
            $(this).attr('data-recording', 'true');
            myRecorder.start();
        } else {
            $(this).attr('data-recording', '');
            myRecorder.stop(listObject);
        }
    });
});
