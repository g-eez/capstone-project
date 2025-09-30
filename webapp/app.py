import streamlit as st
import joblib, os
from src.rag_utils import retrieve_and_rank  # implement this in src/
st.title('Respiratory Diagnostic Assistant (MVP)')

symptoms = st.text_area('Enter patient symptoms (comma separated)')
age = st.number_input('Age', min_value=0, max_value=120, value=30)
sex = st.selectbox('Sex', ['unknown','male','female','other'])

if st.button('Get suggestions'):
    st.info('This is a mock demo. Replace retrieve_and_rank with actual retrieval+LLM logic.')
    # mocked results
    results = [
        {'disease':'Asthma','score':0.82,'explanation':'Wheeze and dyspnea present. Evidence: records 1,3','evidence':['rec1 snippet','rec3 snippet']},
        {'disease':'COPD','score':0.47,'explanation':'Chronic cough pattern. Evidence: record 2','evidence':['rec2 snippet']},
        {'disease':'Pneumonia','score':0.33,'explanation':'Fever + cough possibly pneumonia. Evidence: record 4','evidence':['rec4 snippet']},
    ]
    for i,r in enumerate(results,1):
        st.subheader(f"{i}. {r['disease']} (score: {r['score']:.2f})")
        st.write(r['explanation'])
        st.write('Evidence:')
        for e in r['evidence']:
            st.write('-', e)
