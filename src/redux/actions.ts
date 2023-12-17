import { resultsActions } from '@/redux/resultsSlice.ts';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/redux/index.ts';

const actions = {
    ...resultsActions
};

export function useActions() {
    return bindActionCreators(actions, useAppDispatch());
}