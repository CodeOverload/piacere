import ViewModel from './view-model';

$(() => {
    const vm = new ViewModel();
    ko.applyBindings(vm);
});
