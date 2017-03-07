import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
    private _states = [
        'Abia',
        'Abuja',
        'Adamawa',
        'Anambra',
        'Akwa Ibom',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Enugu',
        'Edo',
        'Ekiti',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara'
    ];

    getStates(){
        return this._states;
    }
}