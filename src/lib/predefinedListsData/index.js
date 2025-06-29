import { situationLists } from './situationLists';
    import { levelLists } from './levelLists';
    import { professionalLists } from './professionalLists';
    import { entrepreneurshipLists } from './entrepreneurshipLists';

    const allPredefinedListsData = {
      situations: {
        name: 'Por Situaciones',
        lists: situationLists,
      },
      level: {
        name: 'Por Nivel',
        lists: levelLists,
      },
      professional: {
        name: 'Por Sectores Profesionales',
        lists: professionalLists,
      },
      entrepreneurshipCategory: {
        name: 'Emprendimiento',
        lists: entrepreneurshipLists,
      }
    };
    
    export const getPredefinedListsData = () => {
      return allPredefinedListsData;
    };