<template>
    <div class="progress-bar">
        <div class="step">
            <p>Data 1</p>
            <div class="bullet">
                <span>1</span>
            </div>
            <div class="check fas fa-check"></div>
        </div>
        <div class="step">
            <p>Data 2</p>
            <div class="bullet">
                <span>2</span>
            </div>
            <div class="check fas fa-check"></div>
        </div>
        <div class="step">
            <p>Apps</p>
            <div class="bullet">
                <span>3</span>
            </div>
            <div class="check fas fa-check"></div>
        </div>
        <div class="step">
            <p>Resume</p>
            <div class="bullet">
                <span>4</span>
            </div>
            <div class="check fas fa-check"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.progress-bar {
    display: flex;
    width: 80%;
    margin: 20px auto;
}

.progress-bar .step {
    position: relative;
    text-align: center;
    width: 100%;
}

.progress-bar .step p {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-bottom: 8px;
    transition: 0.2s;
}
.progress-bar .step p.active {
    color: #005395;
}

.progress-bar .step .bullet {
    position: relative;
    height: 25px;
    width: 25px;
    border: 2px solid #000;
    display: inline-block;
    border-radius: 50%;
    transition: 0.2s;
}

.progress-bar .step .bullet.active {
    border-color: #005395;
    background: #005395;
}

.progress-bar .step:last-child .bullet::before,
.progress-bar .step:last-child .bullet::after {
    display: none;
}

.progress-bar .step .bullet::before,
.progress-bar .step .bullet::after {
    position: absolute;
    content: '';
    bottom: 9px;
    right: -103px; /* Va a tener que cambiar con el tamaño */
    height: 3px;
    width: 90px;
    background: #262626;
}

@media (max-width: 1024px) {
    .progress-bar .step .bullet::before,
    .progress-bar .step .bullet::after {
        right: -68px;
        width: 56px;
    }
}

@media (max-width: 768px) {
    .progress-bar .step .bullet::before,
    .progress-bar .step .bullet::after {
        right: -49px;
        width: 41px;
    }
}

@media (max-width: 375px) {
    .progress-bar .step p {
        font-size: 14px;
    }
    .progress-bar .step .bullet::before,
    .progress-bar .step .bullet::after {
        right: -40px;
        width: 34px;
    }
}

@media (max-width: 320px) {
    .progress-bar .step .bullet::before,
    .progress-bar .step .bullet::after {
        right: -31px;
        width: 26px;
    }
}

.progress-bar .step .bullet.active::after {
    background: #005395;
    transform: scaleX(0);
    transform-origin: left;
    animation: animate 0.3s linear forwards;
}
@keyframes animate {
    100% {
        transform: scaleX(1)
    }
}


.progress-bar .step .bullet span {
    font-weight: 500;
    font-size: 17px;
    line-height: 25px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.progress-bar .step .bullet.active span {
    display: none;
}

.progress-bar .step .check {
    position: absolute;
    left: 50%;
    top: 70%;
    font-size: 15px;
    transform: translate(-50%, -50%);
    display: none;
}

.progress-bar .step .check.active {
    display: block;
    color: #fff;
}

</style>