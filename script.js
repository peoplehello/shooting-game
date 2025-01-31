document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const gameContainer = document.getElementById('game-container');
    let playerLeft = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
    const playerSpeed = 10;
    const bulletSpeed = 5;
    const targetSpeed = 2;

    function movePlayer() {
        player.style.left = playerLeft + 'px';
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft' && playerLeft > 0) {
            playerLeft -= playerSpeed;
            movePlayer();
        } else if (e.code === 'ArrowRight' && playerLeft < gameContainer.offsetWidth - player.offsetWidth) {
            playerLeft += playerSpeed;
            movePlayer();
        } else if (e.code === 'Space') {
            shoot();
        }
    });

    function shoot() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = playerLeft + player.offsetWidth / 2 - 2.5 + 'px';
        bullet.style.top = player.offsetTop - 20 + 'px';
        gameContainer.appendChild(bullet);

        const bulletInterval = setInterval(() => {
            const bulletTop = parseInt(bullet.style.top);
            if (bulletTop <= 0) {
                clearInterval(bulletInterval);
                gameContainer.removeChild(bullet);
            } else {
                bullet.style.top = bulletTop - bulletSpeed + 'px';
            }

            // Check for collision with targets
            const targets = document.querySelectorAll('.target');
            targets.forEach(target => {
                if (isColliding(bullet, target)) {
                    clearInterval(bulletInterval);
                    gameContainer.removeChild(bullet);
                    gameContainer.removeChild(target);
                }
            });
        }, 20);
    }

    function createTarget() {
        const target = document.createElement('div');
        target.classList.add('target');
        target.style.left = Math.random() * (gameContainer.offsetWidth - 40) + 'px';
        gameContainer.appendChild(target);

        const targetInterval = setInterval(() => {
            const targetTop = parseInt(target.style.top) || 0;
            if (targetTop >= gameContainer.offsetHeight) {
                clearInterval(targetInterval);
                gameContainer.removeChild(target);
            } else {
                target.style.top = targetTop + targetSpeed + 'px';
            }
        }, 20);
    }

    function isColliding(bullet, target) {
        const bulletRect = bullet.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        return (
            bulletRect.left < targetRect.left + targetRect.width &&
            bulletRect.left + bulletRect.width > targetRect.left &&
            bulletRect.top < targetRect.top + targetRect.height &&
            bulletRect.top + bulletRect.height > targetRect.top
        );
    }

    setInterval(createTarget, 2000);
});
