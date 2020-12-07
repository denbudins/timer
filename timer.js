class Timer{
    constructor(durationInput, startButton, pauseButton, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start.bind(this));
        this.pauseButton.addEventListener('click', this.pause);
    }
    // Kako bi funkcionralo sa ključnom riječi this mora se koristiti arrow funkcija
    // Ona jedina osigurava da se prosljedi objekt koji očekujemo (ono što se nalazi u konstruktoru)
    start = () => {
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
        this.tick();
        // setInterval izvršava neku funkciju u određenim razmacima
        this.interval = setInterval(this.tick, 50);
    };

    tick = () => {
        if(this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        }else {
            this.timeRemaining = this.timeRemaining - 0.05;
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }
    };

    pause = () => {
        clearInterval(this.interval);
    };

    // geter
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    };

    //seter
    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2);
    };
}