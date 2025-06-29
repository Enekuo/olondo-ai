import { situationLists } from '@/lib/predefinedListsData/situationLists';
    import { levelLists } from '@/lib/predefinedListsData/levelLists';
    import { professionalLists } from '@/lib/predefinedListsData/professionalLists';
    import { entrepreneurshipLists } from '@/lib/predefinedListsData/entrepreneurshipLists';

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
    }