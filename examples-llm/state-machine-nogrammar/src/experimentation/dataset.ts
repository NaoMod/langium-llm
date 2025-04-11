export const models: string[] = [
    `statemachine SmartHomeSystem
events
    activate
    deactivate
    alert
    resetAlert
commands
    enableSystem
    disableSystem
    sendAlert
    resetAlert
initialState inactive
state inactive
    actions { disableSystem }
    activate => active
end
state active
    actions { enableSystem }
    deactivate => inactive
    alert => alerting
end
state alerting
    actions { sendAlert }
    deactivate => inactive
    resetAlert => active
end`,

    `statemachine TrafficLight
events
    change
commands
    turnRed
    turnGreen
initialState red
state red
    actions { turnRed }
    change => green
end
state green
    actions { turnGreen }
    change => red
end`,

    `statemachine DoorLock
events
    lock
    unlock
commands
    lockDoor
    unlockDoor
initialState locked
state locked
    actions { lockDoor }
    unlock => unlocked
end
state unlocked
    actions { unlockDoor }
    lock => locked
end`,

    `statemachine SmartIrrigationSystem
events
    start
    stop
    rainDetected
    dryDetected
commands
    startIrrigation
    stopIrrigation
    pauseIrrigation
    resumeIrrigation
initialState off
state off
    actions { stopIrrigation }
    start => irrigating
end
state irrigating
    actions { startIrrigation }
    stop => off
    rainDetected => paused
end
state paused
    actions { pauseIrrigation }
    dryDetected => irrigating
    stop => off
end`,

    `statemachine ManufacturingRobot
events
    start
    stop
    error
    reset
commands
    initialize
    halt
    handleError
    resume
initialState idle
state idle
    actions { halt }
    start => operating
end
state operating
    actions { initialize }
    stop => idle
    error => errorState
end
state errorState
    actions { handleError }
    reset => idle
    start => operating
end`,

    `statemachine AdvancedWashingMachine
events
    start
    stop
    pause
    resume
    error
    reset
commands
    startWashing
    stopWashing
    pauseWashing
    resumeWashing
    handleError
    resetMachine
initialState idle
state idle
    actions { stopWashing }
    start => washing
end
state washing
    actions { startWashing }
    stop => idle
    pause => paused
    error => errorState
end
state paused
    actions { pauseWashing }
    resume => washing
    stop => idle
end
state errorState
    actions { handleError }
    reset => idle
end`,

    `statemachine AutonomousCar
events
    start
    stop
    obstacleDetected
    clearPath
commands
    drive
    stopCar
    avoidObstacle
    resumeDriving
initialState parked
state parked
    actions { stopCar }
    start => driving
end
state driving
    actions { drive }
    stop => parked
    obstacleDetected => avoidingObstacle
end
state avoidingObstacle
    actions { avoidObstacle }
    clearPath => driving
    stop => parked
end`,

    `statemachine Thermostat
events
    increase
    decrease
commands
    heat
    cool
initialState cool
state cool
    actions { cool }
    increase => heat
end
state heat
    actions { heat }
    decrease => cool
end`,

    `statemachine AdvancedAlarmSystem
events
    arm
    disarm
    trigger
    reset
commands
    activate
    deactivate
    soundAlarm
    resetSystem
initialState disarmed
state disarmed
    actions { deactivate }
    arm => armed
end
state armed
    actions { activate }
    disarm => disarmed
    trigger => triggered
end
state triggered
    actions { soundAlarm }
    reset => armed
    disarm => disarmed
end`,

    `statemachine AdvancedSprinklerSystem
events
    activate
    deactivate
    rainDetected
commands
    startSprinkling
    stopSprinkling
    pauseSprinkling
initialState off
state off
    actions { stopSprinkling }
    activate => on
end
state on
    actions { startSprinkling }
    rainDetected => paused
    deactivate => off
end
state paused
    actions { pauseSprinkling }
    activate => on
    deactivate => off
end`,

    `statemachine MusicPlayer
events
    play
    pause
    stop
    next
    previous
commands
    startPlaying
    pausePlaying
    stopPlaying
    skipToNext
    skipToPrevious
initialState stopped
state stopped
    actions { stopPlaying }
    play => playing
end
state playing
    actions { startPlaying }
    pause => paused
    stop => stopped
    next => skippingForward
    previous => skippingBackward
end
state paused
    actions { pausePlaying }
    play => playing
    stop => stopped
end
state skippingForward
    actions { skipToNext }
    play => playing
    stop => stopped
end
state skippingBackward
    actions { skipToPrevious }
    play => playing
    stop => stopped
end`,

    `statemachine AirConditioner
events
    turnOn
    turnOff
    setEcoMode
commands
    startCooling
    stopCooling
    enableEcoMode
initialState off
state off
    actions { stopCooling }
    turnOn => on
end
state on
    actions { startCooling }
    turnOff => off
    setEcoMode => ecoMode
end
state ecoMode
    actions { enableEcoMode }
    turnOff => off
end`,

    `statemachine Microwave
events
    start
    stop
commands
    cook
    stopCooking
initialState idle
state idle
    actions { stopCooking }
    start => cooking
end
state cooking
    actions { cook }
    stop => idle
end`,

    `statemachine AdvancedMicrowave
events
    start
    stop
    pause
commands
    cook
    stopCooking
    pauseCooking
initialState idle
state idle
    actions { stopCooking }
    start => cooking
end
state cooking
    actions { cook }
    stop => idle
    pause => paused
end
state paused
    actions { pauseCooking }
    start => cooking
    stop => idle
end`,

    `statemachine GarageDoor
events
    open
    close
commands
    openDoor
    closeDoor
initialState closed
state closed
    actions { closeDoor }
    open => opened
end
state opened
    actions { openDoor }
    close => closed
end`,

    `statemachine SecurityCamera
events
    activate
    deactivate
    detectMotion
    clearAlert
    powerOff
commands
    startRecording
    stopRecording
    alertMotion
    clearAlert
    shutdown
initialState off
state off
    actions { stopRecording }
    activate => monitoring
end
state monitoring
    actions { startRecording }
    detectMotion => alerting
    deactivate => idle
end
state alerting
    actions { alertMotion }
    clearAlert => monitoring
    deactivate => idle
end
state idle
    actions { stopRecording }
    activate => monitoring
    powerOff => off
end
state shutdown
    actions { shutdown }
    activate => off
end`,

    `statemachine SmartLight
events
    turnOn
    turnOff
commands
    lightOn
    lightOff
initialState off
state off
    actions { lightOff }
    turnOn => on
end
state on
    actions { lightOn }
    turnOff => off
end`,

    `statemachine SmartCoffeeMachine
events
    start
    stop
    refill
commands
    brewCoffee
    stopBrewing
    refillWater
initialState idle
state idle
    actions { stopBrewing }
    start => brewing
end
state brewing
    actions { brewCoffee }
    stop => idle
    refill => refilling
end
state refilling
    actions { refillWater }
    stop => idle
end`,

    `statemachine SmartElevator
events
    call
    arrive
    openDoor
    closeDoor
commands
    moveToFloor
    openElevatorDoor
    closeElevatorDoor
initialState idle
state idle
    actions { closeElevatorDoor }
    call => moving
end
state moving
    actions { moveToFloor }
    arrive => stopped
end
state stopped
    actions { openElevatorDoor }
    openDoor => open
end
state open
    actions { openElevatorDoor }
    closeDoor => idle
end`,

    `statemachine SmartBlinds
events
    open
    close
    stop
commands
    raiseBlinds
    lowerBlinds
    stopBlinds
initialState closed
state closed
    actions { lowerBlinds }
    open => opening
end
state opening
    actions { raiseBlinds }
    stop => stopped
    close => closed
end
state stopped
    actions { stopBlinds }
    open => opening
    close => closing
end
state closing
    actions { lowerBlinds }
    stop => stopped
    open => opening
end`,

    `statemachine SmartOven
events
    preheat
    bake
    stop
commands
    startPreheating
    startBaking
    stopOven
initialState off
state off
    actions { stopOven }
    preheat => preheating
end
state preheating
    actions { startPreheating }
    bake => baking
    stop => off
end
state baking
    actions { startBaking }
    stop => off
end`,

    `statemachine SmartWashingMachine
events
    start
    stop
    pause
    resume
commands
    startWashing
    stopWashing
    pauseWashing
    resumeWashing
initialState idle
state idle
    actions { stopWashing }
    start => washing
end
state washing
    actions { startWashing }
    stop => idle
    pause => paused
end
state paused
    actions { pauseWashing }
    resume => washing
    stop => idle
end`,

    `statemachine SmartDoorbell
events
    ring
    silence
    reset
commands
    playChime
    silenceChime
    resetDoorbell
initialState idle
state idle
    actions { resetDoorbell }
    ring => ringing
end
state ringing
    actions { playChime }
    silence => silenced
    reset => idle
end
state silenced
    actions { silenceChime }
    reset => idle
end`,

    `statemachine SmartSpeaker
events
    play
    pause
    stop
    volumeUp
    volumeDown
commands
    startPlaying
    pausePlaying
    stopPlaying
    increaseVolume
    decreaseVolume
initialState stopped
state stopped
    actions { stopPlaying }
    play => playing
end
state playing
    actions { startPlaying }
    pause => paused
    stop => stopped
    volumeUp => increasingVolume
    volumeDown => decreasingVolume
end
state paused
    actions { pausePlaying }
    play => playing
    stop => stopped
end
state increasingVolume
    actions { increaseVolume }
    play => playing
    stop => stopped
end
state decreasingVolume
    actions { decreaseVolume }
    play => playing
    stop => stopped
end`,

    `statemachine SmartThermostat
events
    increase
    decrease
    setEcoMode
    reset
commands
    heat
    cool
    enableEcoMode
    resetThermostat
initialState cool
state cool
    actions { cool }
    increase => heat
    setEcoMode => ecoMode
end
state heat
    actions { heat }
    decrease => cool
    reset => idle
end
state ecoMode
    actions { enableEcoMode }
    decrease => cool
    reset => idle
end
state idle
    actions { resetThermostat }
    increase => heat
    setEcoMode => ecoMode
end`,

    `statemachine SmartWindow
events
    open
    close
    lock
commands
    openWindow
    closeWindow
    lockWindow
initialState closed
state closed
    actions { closeWindow }
    open => opened
    lock => locked
end
state opened
    actions { openWindow }
    close => closed
end
state locked
    actions { lockWindow }
    open => opened
end`,

    `statemachine SmartFan
events
    turnOn
    turnOff
    setSpeed
commands
    startFan
    stopFan
    adjustSpeed
initialState off
state off
    actions { stopFan }
    turnOn => running
end
state running
    actions { startFan }
    turnOff => off
    setSpeed => adjustingSpeed
end
state adjustingSpeed
    actions { adjustSpeed }
    turnOff => off
    turnOn => running
end`,

    `statemachine SmartHeater
events
    turnOn
    turnOff
commands
    startHeating
    stopHeating
initialState off
state off
    actions { stopHeating }
    turnOn => on
end
state on
    actions { startHeating }
    turnOff => off
end`,

    `statemachine SmartVacuum
events
    start
    stop
    dock
commands
    startCleaning
    stopCleaning
    dockVacuum
initialState idle
state idle
    actions { stopCleaning }
    start => cleaning
end
state cleaning
    actions { startCleaning }
    stop => idle
    dock => docking
end
state docking
    actions { dockVacuum }
    start => cleaning
    stop => idle
end`,

    `statemachine SmartMicrowave
events
    start
    stop
commands
    cook
    stopCooking
initialState idle
state idle
    actions { stopCooking }
    start => cooking
end
state cooking
    actions { cook }
    stop => idle
end`,
`statemachine SmartCurtains
events
    open
    close
    stop
commands
    openCurtains
    closeCurtains
    stopCurtains
initialState closed
state closed
    actions { closeCurtains }
    open => opening
end
state opening
    actions { openCurtains }
    stop => stopped
    close => closed
end
state stopped
    actions { stopCurtains }
    open => opening
    close => closing
end
state closing
    actions { closeCurtains }
    stop => stopped
    open => opening
end`,
`statemachine SmartBlender
events
    start
    stop
    pulse
commands
    blend
    stopBlending
    pulseBlend
initialState off
state off
    actions { stopBlending }
    start => blending
end
state blending
    actions { blend }
    stop => off
    pulse => pulsing
end
state pulsing
    actions { pulseBlend }
    stop => off
    start => blending
end`
];