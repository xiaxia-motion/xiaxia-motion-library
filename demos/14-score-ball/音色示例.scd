// 在 SuperCollider 中选中括号内整段并运行。先启动本机声音服务，再以 0.345 秒间距播放 13 击。
(
s.waitForBoot({
    SynthDef(\motionMallet, { |freq=440, amp=0.14, overtone=2|
        var env = EnvGen.kr(Env.perc(0.007, 0.55), doneAction: 2);
        var tone = SinOsc.ar(freq) + (0.23 * SinOsc.ar(freq * overtone)) + (0.075 * SinOsc.ar(freq * 4.12));
        Out.ar(0, (tone * env * amp) ! 2);
    }).add;
    s.sync;
    Routine({
        13.do({ |i|
            var note = [72, 72, 60, 72, 72, 84, 72, 60, 72, 72, 60, 72, 72].at(i);
            Synth(\motionMallet, [\freq, note.midicps, \overtone, [2, 2.71, 2, 2, 2.71, 2, 2, 2.71, 2, 2, 2.71, 2, 2].at(i)]);
            0.345.wait;
        });
    }).play(SystemClock);
});
)
