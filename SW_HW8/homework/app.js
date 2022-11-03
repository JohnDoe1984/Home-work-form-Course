const appRoot = document.getElementById('app-root');

const minusOne = -1

let selectListner;

let orderByColumn;
let orderBy;

function setUpForm() {
    const setUpForm = document.createElement('form');
    setUpForm.setAttribute('class', 'form');
    appRoot.appendChild(setUpForm);

    const header = document.createElement('header');
    header.setAttribute('id', 'header');
    header.innerHTML = `Countries Search`;
    appRoot.prepend(header);

    const div = document.createElement('div');
    setUpForm.appendChild(div);

    const search = document.createElement('div');
    search.setAttribute('class', 'search');
    div.appendChild(search);

    const textRegion = document.createElement('div');
    textRegion.innerHTML = 'Please choose type of search:';
    search.appendChild(textRegion)

    const divFlexButtons = document.createElement('div')
    search.appendChild(divFlexButtons)

    const inputRegion = document.createElement('div');
    divFlexButtons.appendChild(inputRegion)

    const byRegion = document.createElement('input');
    byRegion.setAttribute('type', 'radio');
    byRegion.setAttribute('id', 'region');
    byRegion.setAttribute('name', 'typeOfSearch');
    inputRegion.appendChild(byRegion);

    const labelRegion = document.createElement('label');
    labelRegion.setAttribute('for', 'region');
    labelRegion.innerHTML = 'By Region';
    inputRegion.appendChild(labelRegion);

    const divLanguage = document.createElement('div');
    divFlexButtons.appendChild(divLanguage)

    const byLanguage = document.createElement('input');
    byLanguage.setAttribute('type', 'radio');
    byLanguage.setAttribute('id', 'language');
    byLanguage.setAttribute('name', 'typeOfSearch');
    divLanguage.appendChild(byLanguage);

    const labelLanguage = document.createElement('label');
    labelLanguage.setAttribute('for', 'language');
    labelLanguage.innerHTML = 'By Language';
    divLanguage.appendChild(labelLanguage);

    const searchQuery = document.createElement('div');
    searchQuery.setAttribute('class', 'searchQuery');
    searchQuery.innerHTML = 'Please choose search query:';
    div.appendChild(searchQuery);

    const searchQuerySelect = document.createElement('select');
    searchQuerySelect.setAttribute('disabled', 'true');
    searchQuery.appendChild(searchQuerySelect);

    addOption(searchQuerySelect, 'Select value', '');

    byRegion.addEventListener('click', () => {
        onRegionClick(searchQuerySelect);
    });

    byLanguage.addEventListener('click', () => {
        onLanguageClick(searchQuerySelect);
    });

    return setUpForm;
}

function addOption(selectEl, label, value) {
    const option = document.createElement('option');
    option.innerHTML = label;
    option.setAttribute('value', value);
    selectEl.appendChild(option);
}

function onRegionClick(selectEl) {
    selectEl.innerHTML = '';
    addOption(selectEl, 'Select value', '');
    selectEl.removeAttribute('disabled');
    const regions = externalService.getRegionsList();
    regions.forEach(region => {
        addOption(selectEl, region, region);
    });

    if (selectListner) {
        selectEl.removeEventListner('change', selectListner);
    }

    selectListner = selectEl.addEventListener('change', (e) => {
        onRegionSelected(e.target.value);
    });
}

function onLanguageClick(selectEl) {
    selectEl.innerHTML = '';
    addOption(selectEl, 'Select value', '');
    selectEl.removeAttribute('disabled');
    const languages = externalService.getLanguagesList();
    languages.forEach(language => {
        addOption(selectEl, language, language);
    });

    if (selectListner) {
        selectEl.removeEventListner('change', selectListner);
    }

    selectListner = selectEl.addEventListener('change', (e) => {
        onLanguageSelected(e.target.value);
    });
}

function onLanguageSelected(language) {
    const countryList = externalService.getCountryListByLanguage(language);
    buildTable(countryList);
}

function onRegionSelected(region) {
    const countryList = externalService.getCountryListByRegion(region);
    buildTable(countryList);
}

function buildTable(data) {
    const existing = document.getElementById('table');
    if (existing) {
        existing.remove();
    }
    const table = document.createElement('table');
    table.setAttribute('id', 'table');
    createHeader(table);
    data.sort((a, b) => {
        if (!orderByColumn) {
            return 0;
        }
        const aField = a[orderByColumn];
        const bField = b[orderByColumn];
        const result = aField > bField ? 1 : minusOne;
        return result * orderBy;
    }).forEach(item => {
        createRow(item, table);
    });
    appRoot.appendChild(table);

    function createHeader(table) {
        const tableRowHeader = document.createElement('tr');
        tableRowHeader.setAttribute('id', 'tableHeader')
        table.appendChild(tableRowHeader);

        const countryNameTable = document.createElement('th');
        countryNameTable.innerHTML = `Country name`;
        tableRowHeader.appendChild(countryNameTable);

        const arrowName = document.createElement('span');
        arrowName.innerHTML = `&#8597;`
        arrowName.setAttribute('class', 'clickable sortable');
        countryNameTable.appendChild(arrowName);
        addSorting(arrowName, 'name');

        const capitalName = document.createElement('th');
        capitalName.innerHTML = `Capital`;
        tableRowHeader.appendChild(capitalName);

        const worldRegionName = document.createElement('th');
        worldRegionName.innerHTML = `World Region`;
        tableRowHeader.append(worldRegionName);

        const languagesName = document.createElement('th');
        languagesName.setAttribute('id', 'languageRow')
        languagesName.innerHTML = `Languages`;
        tableRowHeader.appendChild(languagesName);

        const areaNum = document.createElement('th');
        areaNum.innerHTML = `Area`;
        tableRowHeader.appendChild(areaNum);

        const arrowArea = document.createElement('span');
        arrowArea.innerHTML = `&#8597;`
        arrowArea.setAttribute('class', 'clickable sortable');
        areaNum.appendChild(arrowArea);
        addSorting(arrowArea, 'area');

        const flagURL = document.createElement('th');
        flagURL.innerHTML = `Flag`;
        tableRowHeader.appendChild(flagURL);
    }
    function createRow(rowData, table) {
        const tableRowEl = document.createElement('tr');
        tableRowEl.setAttribute('id', 'tableElements');
        table.appendChild(tableRowEl);

        const countryNameTable = document.createElement('th');
        countryNameTable.innerHTML = rowData.name;
        tableRowEl.appendChild(countryNameTable);

        const capitalElements = document.createElement('th');
        capitalElements.innerHTML = rowData.capital;
        tableRowEl.appendChild(capitalElements);

        const worldRegionEl = document.createElement('th');
        worldRegionEl.innerHTML = rowData.region;
        tableRowEl.appendChild(worldRegionEl);

        const languagesElements = document.createElement('th');
        languagesElements.innerHTML = Object.values(rowData.languages).join(', ');
        tableRowEl.appendChild(languagesElements);

        const areaElements = document.createElement('th');
        areaElements.innerHTML = rowData.area;
        tableRowEl.appendChild(areaElements);

        const flagElements = document.createElement('th');
        flagElements.innerHTML = ``;
        tableRowEl.appendChild(flagElements);
    }

    function addSorting(colEl, field) {
        colEl.addEventListener('click', () => {
            if (orderByColumn === field) {
                orderBy *= minusOne;
            } else {
                orderByColumn = field;
                orderBy = 1;
            }

            buildTable(data);
        })
    }
}

setUpForm();