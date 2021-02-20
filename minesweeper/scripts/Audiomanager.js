//// Copyright (c) 2021 Daiyong Kim
'use strict';

export default class AudioManager {
    constructor() {
        const config = {
            formats: ["wav"],
            preload: true,
            autoplay: false,
            loop: false,
        }

        this.backgroundSound = new buzz.sound("../sounds/background", config);
    }
}