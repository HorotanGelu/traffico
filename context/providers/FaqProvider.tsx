import React, { createContext, useEffect, useState } from 'react';
import { fetchFaq } from '../../pages/api/faq';
import { useAlert } from '../hooks/useAlert';

type Props = {
  children: React.ReactNode;
};

type Faq = {
  title: string;
  Message: string;
}[];

type State = {
  originalFaq: Faq | undefined;
  faq: Faq | undefined;
  load: number;
  isLoading: boolean;
  loadStatus: string;
  setLoadStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
  setOriginalFaq: React.Dispatch<React.SetStateAction<Error | undefined>>;
  setFaq: React.Dispatch<React.SetStateAction<Error | undefined>>;
  // setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
  setLoad: React.Dispatch<React.SetStateAction<number | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getFaq: () => Promise<Error | undefined>;
  loadMore: () => number;
};

export const FaqContext = createContext<State>({} as State);

export const FaqProvider = ({ children }: Props) => {
  const { createAlert } = useAlert();
  const [originalFaq, setOriginalFaq] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState();
  const [load, setLoad] = useState(10);
  const [faq, setFaq] = useState();
  const [loadStatus, setLoadStatus] = useState('');

  const getFaq = async () => {
    try {
      const res = await fetchFaq();
      localStorage.setItem('faq', JSON.stringify(res));
      setIsLoading(false);
      setOriginalFaq(res);
      createAlert('Questions loaded successfully!', true);
      return res;
    } catch (error) {
      setIsLoading(false);
      createAlert('Something went wrong while loading questions!', false);
      // setError(error);
      return error;
    }
  };

  useEffect(() => {
    setLoadStatus(() =>
      load === originalFaq?.length ? 'SHOW LESS' : 'LOAD MORE'
    );
  }, [load, originalFaq?.length]);

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    const localFaq = JSON.parse(localStorage.getItem('faq'));

    if (localFaq) {
      setOriginalFaq(localFaq);
    } else if (localFaq === null) {
      getFaq();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    setFaq(() => originalFaq?.slice(0, load));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, originalFaq]);

  const loadMore = () => {
    if (load === originalFaq?.length) {
      setLoad((prevState) => prevState - 4);
    } else {
      setLoad((prevState) => prevState + 2);
    }

    return load;
  };

  return (
    <FaqContext.Provider
      displayName={'Faq'}
      // @ts-ignore: Unreachable code error
      value={{
        faq,
        load,
        // error,
        loadStatus,

        loadMore,
        isLoading,
        getFaq,
      }}
    >
      {children}
    </FaqContext.Provider>
  );
};
