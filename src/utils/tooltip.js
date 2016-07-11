export function buildTemplate (data) {

    var style = `border-left-color: ${data.color}`;

    return (`<div class="artem-tooltip">
                <div class="artem-tooltip-row" style="${style}">
                    <span class="label">${data.key}:</span>&nbsp;<span class="value">${data.value}</span>
                </div>
             </div>`);
}