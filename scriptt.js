<script>
document.addEventListener('DOMContentLoaded', function() {
const testElements = [
    { className: 'adsbox', innerHTML: '&nbsp;' },
    { id: 'ad-container', innerHTML: '&nbsp;' },
    { className: 'google-ad', innerHTML: '&nbsp;' }
];

testElements.forEach(createTestElement);

setTimeout(checkAdBlocker, 100);

function createTestElement(elementInfo) {
    const el = document.createElement('div');
    if (elementInfo.id) el.id = elementInfo.id;
    if (elementInfo.className) el.className = elementInfo.className;
    el.innerHTML = elementInfo.innerHTML;
    document.body.appendChild(el);
}

function checkAdBlocker() {
    const adBlocked = testElements.some(isAdBlocked);

    if (adBlocked) {
        showAdBlockMessage();
        disableSiteInteraction();
        disableNavBar();
    } else {
        console.log('No AdBlock detected');
    }

    testElements.forEach(removeTestElement);
}

function isAdBlocked(elementInfo) {
    const el = elementInfo.id ? 
        document.getElementById(elementInfo.id) :
        document.getElementsByClassName(elementInfo.className)[0];
    return el && el.offsetHeight === 0;
}

function removeTestElement(elementInfo) {
    const el = elementInfo.id ? 
        document.getElementById(elementInfo.id) :
        document.getElementsByClassName(elementInfo.className)[0];
    if (el) el.remove();
}

function showAdBlockMessage() {
    const message = document.createElement('div');
    applyStyle(message, {
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: '1001', background: 'black', color: 'white', padding: '20px',
        borderRadius: '10px', border: '1px solid white'
    });
    message.innerHTML = '<p>Please turn off your ad blocker to improve your experience on our website.</p>';
    document.body.appendChild(message);
}

function disableSiteInteraction() {
    const overlay = document.createElement('div');
    applyStyle(overlay, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        background: 'rgba(0, 0, 0, 0.7)', zIndex: '1000'
    });
    document.body.appendChild(overlay);
}

function disableNavBar() {
    const navBar = document.getElementById('nav');
    if (navBar) applyStyle(navBar, { pointerEvents: 'none', opacity: '0.5' });
}

function applyStyle(element, styles) {
    Object.assign(element.style, styles);
}
});
</script>
