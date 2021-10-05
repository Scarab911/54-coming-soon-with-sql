class ProgressBars {
    constructor(data) {
        this.data = data;
    }

    isValidData() {
        if (!Array.isArray(this.data) ||
            this.data.length === 0) {
            return false;
        }
        return true;
    }

    isValidBar(bar) {
        if (typeof bar !== 'object' ||
            bar === null ||
            Array.isArray(bar) ||
            typeof bar.title !== 'string' ||
            bar.title === '' ||
            typeof bar.value !== 'number' ||
            !isFinite(bar.value) ||
            bar.value < 0 ||
            bar.value > 100) {
            return false;
        }
        return true;
    }

    render() {
        let HTML = '';

        if (this.isValidData()) {
            for (const bar of this.data) {
                if (this.isValidBar(bar)) {
                    const value = Math.round(bar.value);
                    HTML += `<div class="progress-bar">
                                <div class="top">
                                    <div class="title">${bar.title}</div>
                                    <div class="value">${value}%</div>
                                </div>
                                <div class="bottom">
                                    <div class="progress" style="width: ${value}%;">
                                        <div class="value"></div>
                                    </div>
                                </div>
                            </div>`;
                }
            }
        }

        return HTML;
    }
}

module.exports = ProgressBars;